export const calculateExpiryDays = (warrantyExpiry: string): number => {
    if (!warrantyExpiry) return 0;

    const expiry = new Date(warrantyExpiry);
    const now = new Date();

    expiry.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffMs = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
}; 