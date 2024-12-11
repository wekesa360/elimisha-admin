import { useState } from "react";
import { useActivities } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { GridContainer } from "@/components/layout/grid-container";
import { Plus, Activity as ActivityIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ActivityForm } from "./components/activity-form";
import { ActivityCard } from "./components/activity-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Activity } from "@/lib/api/types";
import { ViewDialog } from "./components/activity-view-dialog";

export default function ActivitiesPage() {
  const { activities, isLoading, create, update, delete: deleteActivity } = useActivities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleCreateUpdate = async (formData: FormData) => {
    try {
      if (selectedActivity) {
        await update({ id: selectedActivity.id, data: formData });
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      // Error is handled by the API hook
    }
  };

  const handleDelete = async () => {
    if (!selectedActivity) return;
    try {
      await deleteActivity(selectedActivity.id);
      setIsDeleteDialogOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      // Error is handled by the API hook
    }
  };

  if (isLoading) {
    return <div className="text-foreground">loading....</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Activities"
        action={{
          label: "Add Activity",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {activities.length === 0 ? (
        <EmptyState
          icon={ActivityIcon}
          title="No activities yet"
          description="Start by creating your first activity."
          action={{
            label: "Add Activity",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <GridContainer columns={4}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onView={(activity) => {
                setSelectedActivity(activity);
                setIsViewDialogOpen(true);
              }}
              onEdit={(activity) => {
                setSelectedActivity(activity);
                setIsModalOpen(true);
              }}
              onDelete={(activity) => {
                setSelectedActivity(activity);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
        </GridContainer>
      )}

      <Modal
        title={selectedActivity ? "Edit Activity" : "Add Activity"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedActivity(null);
        }}
      >
        <ActivityForm
          initialData={selectedActivity}
          onSubmit={handleCreateUpdate}
        />
      </Modal>

      <ViewDialog
        activity={selectedActivity}
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedActivity(null);
        }}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Activity" 
        description="Are you sure you want to delete this activity? This action cannot be undone."
      />
    </div>
  );
}