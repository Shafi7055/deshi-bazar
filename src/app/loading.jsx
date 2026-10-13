export default function Loading() {
  return (
    <div className="page-container section" aria-label="পণ্য লোড হচ্ছে">
      <div className="skeleton" style={{ height: 36, maxWidth: 240, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 18, maxWidth: 320, marginBottom: 28 }} />
      <div className="loading-grid">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton" key={index} />
        ))}
      </div>
    </div>
  );
}
