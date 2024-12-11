interface CardContainerProps {
    children: React.ReactNode;
  }
  
  export function CardContainer({ children }: CardContainerProps) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        {children}
      </div>
    );
  }
  