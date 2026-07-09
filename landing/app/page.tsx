import type { CSSProperties } from "react";
import Reveal from "./components/Reveal";

/* ── 팔레트 ── */
const C = {
  paper: "#F6F4EF",
  ink: "#16171D",
  mid: "#3A3D48",
  sub: "#8A8D9B",
  line: "#E4E1DA",
  coral: "#FF5B45",
  indigo: "#4B3DE8",
  darkLine: "#2B2D36",
};

/* ── 공통 스타일 ── */
const eyebrow = (color: string): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "0.1em",
  color,
  marginBottom: 24,
});
const h2big: CSSProperties = {
  fontSize: 46,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
};
const card: CSSProperties = {
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 20,
  padding: 40,
};

/* ── 데이터 ── */
const PROBLEMS = [
  { n: "+4.4%", d: "국내 웹툰 매출 성장률 (코로나기 +65%에서 급감)" },
  { n: "–17.9%", d: "신작 등록 감소 · 창작자 이탈 가속" },
  { n: "8 / 10", d: "상위 제작사 중 적자 기업 수" },
];

const HOW_CHIPS = ["화면 구도", "배경 · 조명", "표정 · 연출", "말풍선 · 효과음"];

type Mode = { t: string; d: string; variant: "plain" | "feature" | "summary" };
const MODES: Mode[] = [
  { t: "개인 연재", d: "AI 어시스턴트랑 혼자서 연재해요. 공개할지, 브랜치를 열지도 직접 골라요.", variant: "plain" },
  { t: "비공개 협업", d: "초대 코드로 팀을 만들어 실시간으로 같이 그려요. 설정 정리는 AI 감독이 맡아줘요.", variant: "plain" },
  { t: "공개 릴레이", d: "누구나 이어 그리는, 끝나지 않는 웹툰이에요. 세계관은 AI가 든든히 지켜줘요.", variant: "plain" },
  { t: "브랜치", d: "기존 작품에서 새로운 세계선을 열어요. 평행세계로 이야기가 무한히 뻗어나가요.", variant: "plain" },
  { t: "이벤트", d: "이어그리기, 챌린지, 기업 콜라보까지. 부담 없이 가볍게 즐겨요.", variant: "plain" },
  { t: "5가지 모드, 하나의 세계", d: "어떻게 참여하든, 같은 세계관 위에 차곡차곡 쌓여요.", variant: "summary" },
];

const REVENUES = ["광고", "구독", "후원", "IP 라이선스"];

/* 히어로 배경 그리드 — 8×4, 특정 셀에만 그라데이션 */
const GRID_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg,rgba(75,61,232,0.3),transparent)",
  5: "linear-gradient(135deg,rgba(255,91,69,0.24),transparent)",
  11: "linear-gradient(135deg,rgba(75,61,232,0.22),transparent)",
  22: "linear-gradient(135deg,rgba(255,91,69,0.2),transparent)",
};

function HeroGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.5,
        display: "grid",
        gridTemplateColumns: "repeat(8,1fr)",
        gridTemplateRows: "repeat(4,1fr)",
      }}
    >
      {Array.from({ length: 32 }).map((_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return (
          <div
            key={i}
            style={{
              borderRight: col < 7 ? `1px solid ${C.darkLine}` : undefined,
              borderBottom: row < 3 ? `1px solid ${C.darkLine}` : undefined,
              background: GRID_GRADIENTS[i],
            }}
          />
        );
      })}
    </div>
  );
}

/* 컷 이미지 자리 (플레이스홀더) */
function CutSlot({ height }: { height: number }) {
  return (
    <div
      style={{
        height,
        borderRadius: 10,
        background:
          "linear-gradient(135deg,#252630,#1a1b23), repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 8px,transparent 8px 16px)",
        border: `1px solid ${C.darkLine}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6B6E7C",
        fontSize: 12,
        letterSpacing: "0.02em",
      }}
    >
      컷 이미지
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Reveal />

      {/* NAV */}
      <nav
        className="nav-bar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          background: "rgba(246,244,239,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, color: C.ink }}>
          <span style={{ width: 16, height: 16, background: C.coral, borderRadius: 4, display: "inline-block" }} />
          <span className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>
            AI Relay
          </span>
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 38 }}>
          {[
            { href: "#how", label: "작동 방식" },
            { href: "#modes", label: "참여 방식" },
            { href: "#branch", label: "브랜치" },
            { href: "#reward", label: "보상" },
          ].map((l) => (
            <a key={l.href} href={l.href} style={{ color: C.mid, fontSize: 16, fontWeight: 600 }}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header
        id="top"
        className="hero-sec"
        style={{ position: "relative", padding: "110px 48px 120px", overflow: "hidden", background: C.ink, color: C.paper }}
      >
        <HeroGrid />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap",
          }}
        >
          <div className="hero-left" style={{ flex: 1, minWidth: 320 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 15,
                color: "#C9C7D0",
                marginBottom: 32,
              }}
            >
              <span style={{ width: 8, height: 8, background: C.coral, borderRadius: "50%" }} />
              AI가 다 기억해주는, 함께 그리는 웹툰
            </div>
            <h1 className="hero-title" style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              이제 웹툰,
              <br />
              혼자 그리지 않아요.
            </h1>
            <p style={{ fontSize: 22, color: "#C9C7D0", lineHeight: 1.55, marginTop: 28, maxWidth: 560 }}>
              세계관은 AI가 기억해주고, 이야기는 수천 명이 함께 이어가요. 한 문장이면 충분해요. 오늘 당신도 이 세계에 한 컷을 더해보세요.
            </p>
            <div className="hero-stats mono" style={{ display: "flex", gap: 40, marginTop: 48 }}>
              <div>
                <div style={{ fontSize: 34, fontWeight: 700 }}>∞</div>
                <div style={{ fontSize: 14, color: C.sub, marginTop: 6 }}>종료 없는 릴레이</div>
              </div>
              <div style={{ width: 1, background: C.darkLine }} />
              <div>
                <div style={{ fontSize: 34, fontWeight: 700 }}>1문장</div>
                <div style={{ fontSize: 14, color: C.sub, marginTop: 6 }}>이면 한 컷 완성</div>
              </div>
              <div style={{ width: 1, background: C.darkLine }} />
              <div>
                <div style={{ fontSize: 34, fontWeight: 700 }}>
                  1,000<span style={{ fontSize: 20 }}>화+</span>
                </div>
                <div style={{ fontSize: 14, color: C.sub, marginTop: 6 }}>캐릭터 기억 유지</div>
              </div>
            </div>
          </div>

          <div className="hero-mock" style={{ flex: "0 0 400px", maxWidth: "100%" }}>
            <div
              style={{
                background: "#1E1F27",
                border: `1px solid ${C.darkLine}`,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 30px 70px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: `1px solid ${C.darkLine}` }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#3A3D48" }} />
                ))}
                <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: C.sub }}>
                  airelay.app / 병맛고교 · 47화
                </span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <CutSlot height={150} />
                <CutSlot height={110} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#252630", borderRadius: 10, padding: "12px 14px" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.coral }} />
                  <span style={{ fontSize: 13, color: "#C9C7D0" }}>이제 당신 차례예요 — 한 컷 이어 그려볼까요?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="reveal sec" style={{ padding: "110px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={eyebrow(C.coral)}>
          PROBLEM
          <span style={{ width: 40, height: 2, background: C.coral }} />
        </div>
        <h2 className="big" style={{ ...h2big, maxWidth: 900 }}>
          웹툰 시장, 성장이 멈춰버렸어요.
          <br />
          <span style={{ color: C.sub }}>기존 방식만으로는 한계였거든요.</span>
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 56 }}>
          {PROBLEMS.map((p) => (
            <div key={p.n} style={card}>
              <div className="mono" style={{ fontSize: 44, fontWeight: 700, color: C.coral }}>
                {p.n}
              </div>
              <p style={{ fontSize: 17, color: C.mid, lineHeight: 1.5, marginTop: 16 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="reveal sec" style={{ padding: "110px 48px", background: "#fff", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#FFE8E3",
                color: C.coral,
                fontSize: 15,
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 999,
                marginBottom: 28,
              }}
            >
              이렇게 만들어요
            </div>
            <h2 className="big" style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              “철수가 복도를 걷는다.”
              <br />
              <span style={{ color: C.coral }}>이 한 줄이면 끝나요</span>
            </h2>
            <p style={{ fontSize: 20, color: C.mid, marginTop: 24, maxWidth: 520, lineHeight: 1.55 }}>
              화면 구도부터 배경·조명·표정·말풍선·효과음까지, AI가 알아서 다 만들어줘요. 대사만 툭 적으면 말풍선도 딱 맞는 자리에 예쁘게 놓아줘요.
            </p>
          </div>

          <div style={{ flex: "0 0 480px", maxWidth: "100%" }}>
            <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 24, padding: 32 }}>
              <div style={{ background: "#fff", border: "1px solid #F0D9D2", borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: C.coral, fontSize: 18, fontWeight: 800 }}>›</span>
                <span style={{ fontSize: 18, fontWeight: 700 }}>철수가 복도를 걷는다.</span>
              </div>
              <div style={{ textAlign: "center", color: C.sub, fontSize: 15, fontWeight: 600, margin: "18px 0" }}>↓ AI가 알아서</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {HOW_CHIPS.map((c) => (
                  <span key={c} style={{ background: "#FFF", border: "1px solid #F0D9D2", color: C.coral, fontWeight: 700, fontSize: 15, padding: "10px 18px", borderRadius: 999 }}>
                    {c}
                  </span>
                ))}
              </div>
              <div style={{ textAlign: "center", color: C.sub, fontSize: 18, margin: "18px 0" }}>↓</div>
              <div style={{ background: "#FFF", border: "1px solid #F0D9D2", borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>🗓️</span>
                <span style={{ fontSize: 18, fontWeight: 800 }}>그림 완성 + 설정 노트 자동 정리</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODES */}
      <section id="modes" className="reveal sec" style={{ padding: "110px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={eyebrow(C.indigo)}>
          WAYS TO JOIN
          <span style={{ width: 40, height: 2, background: C.indigo }} />
        </div>
        <h2 className="big" style={h2big}>
          마음에 드는 방식으로 참여해요
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 56 }}>
          {MODES.map((m) => {
            if (m.variant === "summary") {
              return (
                <div key={m.t} style={{ borderRadius: 20, padding: 36, background: C.ink, color: C.paper, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{m.t}</div>
                  <p style={{ fontSize: 16, color: "#C9C7D0", lineHeight: 1.55 }}>{m.d}</p>
                </div>
              );
            }
            const feature = m.variant === "feature";
            return (
              <div
                key={m.t}
                style={{
                  border: feature ? `1.5px solid ${C.indigo}` : `1px solid ${C.line}`,
                  borderRadius: 20,
                  padding: 36,
                  background: feature ? "#ECE9FF" : "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 22, fontWeight: 800 }}>{m.t}</span>
                </div>
                <p style={{ fontSize: 16, color: C.mid, lineHeight: 1.55 }}>{m.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* BRANCH */}
      <section id="branch" className="reveal sec" style={{ padding: "110px 48px", background: C.ink, color: C.paper }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={eyebrow(C.coral)}>
            BRANCH
            <span style={{ width: 40, height: 2, background: C.coral }} />
          </div>
          <h2 className="big" style={h2big}>
            하나의 원작에서, 무한한 평행세계로
          </h2>
          <p style={{ fontSize: 20, color: "#C9C7D0", marginTop: 16, maxWidth: 760, lineHeight: 1.5 }}>
            원하는 화에서 새 세계선을 열면 설정이 그대로 복사되고 Story Bible도 함께 갈라져요. 독자는 마음에 드는 전개를 골라서 보면 돼요.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 56, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 36px" }}>
              <div className="mono" style={{ fontSize: 14, color: C.coral, fontWeight: 700, marginBottom: 8 }}>ORIGIN</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>병맛고교 · 1~50화</div>
            </div>
            <span style={{ color: C.indigo, fontSize: 32 }}>→</span>
            <div style={{ display: "flex", gap: 16, flex: 1, minWidth: 280 }}>
              {[
                { k: "A", t: "추격전", bg: "rgba(75,61,232,0.2)", bd: "rgba(75,61,232,0.4)", kc: "#9A93F2" },
                { k: "B", t: "첫사랑", bg: "rgba(75,61,232,0.14)", bd: "rgba(75,61,232,0.3)", kc: "#9A93F2" },
                { k: "C", t: "다른 세계", bg: "rgba(255,91,69,0.16)", bd: "rgba(255,91,69,0.34)", kc: C.coral },
              ].map((b) => (
                <div key={b.k} style={{ flex: 1, background: b.bg, border: `1px solid ${b.bd}`, borderRadius: 14, padding: 22 }}>
                  <div className="mono" style={{ fontWeight: 700, color: b.kc, marginBottom: 8 }}>{b.k}</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{b.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REWARD */}
      <section id="reward" className="reveal sec" style={{ padding: "110px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={eyebrow(C.indigo)}>
          REWARD
          <span style={{ width: 40, height: 2, background: C.indigo }} />
        </div>
        <h2 className="big" style={{ ...h2big, maxWidth: 820 }}>
          기여한 만큼, 알아서 돌아와요
        </h2>
        <p style={{ fontSize: 20, color: C.mid, marginTop: 16, maxWidth: 720, lineHeight: 1.5 }}>
          참여량·조회수·좋아요·스토리 기여도를 모두 따져서, 수익을 창작자에게 자동으로 나눠줘요. 현금으로도, AI 토큰으로도 받을 수 있어요.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 52, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 18, padding: 32 }}>
            <div style={{ fontSize: 15, color: C.sub, fontWeight: 600, marginBottom: 14 }}>수익 발생</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {REVENUES.map((r) => (
                <span key={r} style={{ background: C.paper, border: `1px solid ${C.line}`, padding: "8px 16px", borderRadius: 999, fontSize: 15, fontWeight: 600 }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
          <span style={{ color: C.sub, fontSize: 28 }}>→</span>
          <div style={{ flex: 1, minWidth: 220, background: C.indigo, color: "#fff", borderRadius: 18, padding: 32 }}>
            <div style={{ fontSize: 15, opacity: 0.8, fontWeight: 600, marginBottom: 14 }}>기여도대로 자동 분배</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>
              창작자에게
              <br />
              현금이나 AI 토큰으로
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal sec" style={{ padding: "120px 48px", background: C.coral, color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <h2 className="big" style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            당신의 한 컷이
            <br />
            이 세계를 바꿔요.
          </h2>
          <p style={{ fontSize: 22, color: "rgba(255,255,255,0.9)", marginTop: 24, lineHeight: 1.5 }}>
            AI가 기억해주고, 모두가 함께 그리는 — 끝나지 않는 이야기예요.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "56px 48px", background: C.ink, color: C.sub }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 14, height: 14, background: C.coral, borderRadius: 4 }} />
            <span className="mono" style={{ fontSize: 18, fontWeight: 700, color: C.paper }}>
              AI Relay
            </span>
          </div>
          <div className="mono" style={{ fontSize: 14, letterSpacing: "0.04em" }}>
            TEAM 방탄근모단 · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
