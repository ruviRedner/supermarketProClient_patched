export const env = {
  useMock: import.meta.env.VITE_USE_MOCK === "true",
  adminCode: import.meta.env.VITE_ADMIN_CODE ?? "",
};
