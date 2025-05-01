const HomeButton: React.FC = () => {
    return (
        <div
            style={{
                position: "absolute",
                top: 20,
                left: 150,
                zIndex: 10000,
                display: "flex",
                gap: "10px",
                pointerEvents: "auto",
            }}
        >
        <button 
            onClick={() => window.location.href = '/'}
            style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "rgba(30, 30, 40, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(40, 40, 50, 0.8)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 30, 40, 0.7)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            >
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" fill="currentColor" />
                    </svg>
                    Home
                </>
            </button>
        </div>
    );
};

export default HomeButton;