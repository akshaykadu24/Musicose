// Shared look for the main call-to-action buttons in the admin panel
export const primaryButtonStyles = {
  color: "white",
  fontWeight: "700",
  borderRadius: "xl",
  bgGradient: "linear(135deg, #ef4444 0%, #e11d48 55%, #be123c 100%)",
  boxShadow: "0 10px 24px rgba(225, 29, 72, 0.35)",
  transition: "all 0.2s ease",
  _hover: {
    bgGradient: "linear(135deg, #dc2626 0%, #be123c 100%)",
    transform: "translateY(-1px)",
    boxShadow: "0 14px 30px rgba(225, 29, 72, 0.45)",
  },
  _active: { transform: "translateY(0)", boxShadow: "0 6px 14px rgba(225, 29, 72, 0.35)" },
  _disabled: { opacity: 0.6, cursor: "not-allowed", transform: "none", boxShadow: "none" },
};

// Small white circle that holds the button icon
export const ButtonIconBadge = ({ children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 24,
      height: 24,
      borderRadius: "999px",
      background: "rgba(255, 255, 255, 0.22)",
    }}
  >
    {children}
  </span>
);
