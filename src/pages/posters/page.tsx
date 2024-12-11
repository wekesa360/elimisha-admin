// src/pages/posters/page.tsx
import { useState } from "react";
import { usePosters } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { GridContainer } from "@/components/layout/grid-container";
import { Plus, Image } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { PosterForm } from "./components/poster-form";
import { PosterCard } from "./components/poster-card";
import { EmptyState } from "@/components/ui/empty-state";
import {Poster} from "@/lib/api/types.ts";

export default function PostersPage() {
  const { posters, isLoading, create, update, toggle, delete: deletePoster } = usePosters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState< Poster | null>(null);

  const handleCreateUpdate = async (formData: FormData) => {
    try {
      if (selectedPoster) {
        await update({id: selectedPoster.id, data: formData});
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      setSelectedPoster(null);
    } catch (error) {
      // Error handled by API hook
    }
  };

  const handleToggle = async (poster:any) => {
    try {
      await toggle(poster.id);
    } catch (error) {
      // Error handled by API hook
    }
  };

  const handleDelete = async () => {
    if (!selectedPoster) return;
    try {
      await deletePoster(selectedPoster?.id);
      setIsDeleteDialogOpen(false);
      setSelectedPoster(null);
    } catch (error) {
      // Error handled by API hook
    }
  };

  if (isLoading) return <div className="text-foreground">loading....</div>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Posters"
        action={{
          label: "Add Poster",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {posters.length === 0 ? (
        <EmptyState
          icon={Image}
          title="No posters yet"
          description="Start by creating your first poster."
          action={{
            label: "Add Poster",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <GridContainer columns={4}>
          {posters.map((poster:any) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              onEdit={(poster:any) => {
                setSelectedPoster(poster);
                setIsModalOpen(true);
              }}
              onDelete={(poster:any) => {
                setSelectedPoster(poster);
                setIsDeleteDialogOpen(true);
              }}
              onToggle={handleToggle}
              onPreview={(poster:any) => {
                setSelectedPoster(poster);
                setIsPreviewModalOpen(true);
              }}
            />
          ))}
        </GridContainer>
      )}

      <Modal
        title={selectedPoster ? "Edit Poster" : "Add Poster"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPoster(null);
        }}
      >
        <PosterForm
          initialData={selectedPoster}
          onSubmit={handleCreateUpdate}
        />
      </Modal>

      <Modal
        title={selectedPoster?.title}
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedPoster(null);
        }}
      >
        {selectedPoster && (
          <img
            src={selectedPoster?.imageUrl}
            alt={selectedPoster?.title}
            className="w-full rounded-lg"
          />
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Poster"
        description="Are you sure you want to delete this poster? This action cannot be undone."
      />
    </div>
  );
}