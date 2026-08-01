const orbs = [
    { size: 560, top: '-12%', left: '-8%', color: '#581c87', duration: '32s', delay: '-4s', blur: 120, opacity: 0.22, anim: 'smoke-drift-a' },
    { size: 420, top: '55%', left: '68%', color: 'var(--primary)', duration: '26s', delay: '-10s', blur: 110, opacity: 0.2, anim: 'smoke-drift-b' },
    { size: 340, top: '5%', left: '58%', color: '#4c1d95', duration: '38s', delay: '-6s', blur: 100, opacity: 0.16, anim: 'smoke-drift-c' },
    { size: 300, top: '72%', left: '8%', color: '#6b21a8', duration: '24s', delay: '-14s', blur: 95, opacity: 0.18, anim: 'smoke-drift-b' },
    { size: 260, top: '32%', left: '18%', color: '#3730a3', duration: '30s', delay: '-2s', blur: 90, opacity: 0.15, anim: 'smoke-drift-a' },
    { size: 220, top: '0%', left: '32%', color: 'var(--primary)', duration: '36s', delay: '-18s', blur: 85, opacity: 0.16, anim: 'smoke-drift-c' },
    { size: 480, top: '78%', left: '55%', color: 'var(--accent)', duration: '28s', delay: '-8s', blur: 115, opacity: 0.14, anim: 'smoke-drift-a' },
];

export default function AmbientBackground() {
    return (
        <div
            aria-hidden
            className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0410]"
        >
            {orbs.map((orb, index) => (
                <span
                    key={index}
                    className="ambient-orb absolute rounded-full will-change-transform"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        top: orb.top,
                        left: orb.left,
                        backgroundColor: orb.color,
                        opacity: orb.opacity,
                        filter: `blur(${orb.blur}px)`,
                        animation: `${orb.anim} ${orb.duration} ease-in-out infinite`,
                        animationDelay: orb.delay,
                    }}
                />
            ))}
            <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>
    );
}
