"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

type Character = {
  id: string;
  nameCn: string;
  nameEn: string;
  role: string;
  intro: string;
  quote: string;
  color: string;
  themeColorWeight?: string;
  glowColorWeight?: string;
};

const characters: Character[] = [
  {
    id: "agent",
    nameCn: "专员",
    nameEn: "Agent",
    role: "执行部／B级专员",
    intro:
      "你是一个新入职的执行部专员，你勤勤恳恳上班，偷偷摸摸划水，偶尔找点刺激！",
    quote: "阳光沙滩椰子鸡……好工作啊！",
    color: "#352D27",
  },
  {
    id: "hikaru",
    nameCn: "三宅光",
    nameEn: "Miyake Hikaru",
    role: "生态部／部长",
    intro:
      "剪除徒长的枝条，维系庭院的繁荣。可能并非看起来那样不近人情。",
    quote: "欢迎加入波下乐土。外勤工作辛苦，务必注意身体。",
    color: "#D7C60D",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
  {
    id: "selene",
    nameCn: "塞勒涅·玛刻檀丝",
    nameEn: "Selene Mactons",
    role: "生态部／生态监测科主任",
    intro: "喜欢听一些闲话。而足够精彩的闲话能换取不菲的利益。",
    quote: "秘密的价格是……更昂贵的秘密。",
    color: "#9740F4",
  },
  {
    id: "lin",
    nameCn: "叶琳",
    nameEn: "Lin Ye",
    role: "生态部／总顾问",
    intro:
      "她有足够多的耐心，足够多的爱意去守护那片梦中无限延伸的森林。",
    quote: "这里的环境总是有些急躁，慢慢来就好。",
    color: "#105C3B",
  },
  {
    id: "vasco",
    nameCn: "瓦斯科·索萨",
    nameEn: "Vasco Sousa",
    role: "海洋部／海洋资源科主任",
    intro:
      "是个世俗的人，比起宏大的人类理想，他更在意人与人之间质朴的感情。",
    quote: "按时吃饭，安全回来。不只是你，还有其他的所有人。",
    color: "#D54215",
  },
  {
    id: "cypsel",
    nameCn: "希普赛尔·雷莫西",
    nameEn: "Cypsel Lemus",
    role: "执行部／EX级专员",
    intro: "一个肾上腺素爱好者。永远在路上，永远不停歇。",
    quote: "放轻松～你负责完成任务，我负责你。",
    color: "#16A8D0",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
  {
    id: "unati",
    nameCn: "尤那提·伍德付雅",
    nameEn: "Unati Woodfire",
    role: "生态部／微观生态科研究员",
    intro: "新生代研究员，在一切奇异的领域有着超乎常人的热情。",
    quote: "微观生态的美丽，可不是俗套的脊椎动物能比拟的！",
    color: "#C50E7F",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
];

const features = [
  {
    id: "01",
    image: assetPath("/assets/feature-combat.png"),
    alt: "即时卡牌战斗游戏截图",
    title: "海波之下，乐土飘摇",
    body: "卡牌Roguelite，但是即时战斗。与海下的敌人交锋，在走位与时机中保护波下乐土！",
  },
  {
    id: "02",
    image: assetPath("/assets/feature-hub.png"),
    alt: "基地对话游戏截图",
    title: "结识伙伴，听闻秘辛",
    body: "在基地中与你的同事们交谈，遇见一些形形色色的人，了解一些神神秘秘的事。",
  },
  {
    id: "03",
    image: assetPath("/assets/feature-deck.png"),
    alt: "卡牌构筑游戏截图",
    title: "生态之间，亦有共鸣",
    body: "构筑你的卡组，体验数十种不同流派。每个物种的兴衰，都是一场蝴蝶效应。",
  },
];

export default function Home() {
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);
  const [previousCharacter, setPreviousCharacter] =
    useState<Character | null>(null);
  const [hoveredCharacterIndex, setHoveredCharacterIndex] = useState<
    number | null
  >(null);
  const characterTransitionTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const featureCards = Array.from(
      document.querySelectorAll<HTMLElement>(".feature-card"),
    );

    featureCards.forEach((card) => card.classList.add("reveal-ready"));

    if (!("IntersectionObserver" in window)) {
      featureCards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    featureCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (characterTransitionTimer.current) {
        clearTimeout(characterTransitionTimer.current);
      }
    },
    [],
  );

  const selectCharacter = (character: Character) => {
    if (character.id === activeCharacter.id) {
      return;
    }

    if (characterTransitionTimer.current) {
      clearTimeout(characterTransitionTimer.current);
    }

    setPreviousCharacter(activeCharacter);
    setActiveCharacter(character);
    characterTransitionTimer.current = setTimeout(() => {
      setPreviousCharacter(null);
      characterTransitionTimer.current = null;
    }, 460);
  };

  return (
    <main
      className="site-shell"
      style={
        {
          "--character-color": activeCharacter.color,
          "--character-color-weight":
            activeCharacter.themeColorWeight ?? "58%",
          "--character-glow-weight":
            activeCharacter.glowColorWeight ?? "26%",
        } as React.CSSProperties
      }
    >
      <style>{`
        @font-face {
          font-display: swap;
          font-family: "Douyu Display";
          font-style: normal;
          font-weight: 400;
          src: url("${assetPath("/fonts/douyu-font.otf")}") format("opentype");
        }
      `}</style>
      <header className="site-header">
        <a className="brand-lockup" href="#home" aria-label="返回首页">
          <img
            src={assetPath("/assets/logos/sailvage-cn.png")}
            alt="波下乐土"
          />
        </a>
        <nav aria-label="主导航">
          <a href="#home">首页</a>
          <a href="#pv">PV</a>
          <a href="#features">玩法</a>
          <a href="#characters">角色</a>
          <a href="#contact">联系</a>
        </nav>
        {/* TODO(i18n): English content will live at /en after the translation is approved. */}
        <button
          className="language-switch"
          type="button"
          aria-label="英文版尚未开放"
          disabled
        >
          中 / EN
        </button>
      </header>

      <section className="hero" id="home">
        <img
          className="hero-art"
          src={assetPath("/assets/hero-kv.jpg")}
          alt="波下乐土主要角色视觉图"
        />
        {/* TODO(steam): Replace this placeholder with the Steam store URL and official logo asset after registration. */}
        <a
          className="steam-float"
          href="#steam-placeholder"
          aria-label="Steam 愿望单链接待开放"
        >
          <span className="steam-symbol" aria-hidden="true">
            ●━○
          </span>
          <span>
            加入 STEAM
            <strong>愿望单</strong>
          </span>
        </a>
        {/* TODO(animation): Add the confirmed one-second intro sequence in a later phase. */}
      </section>

      <section className="pv-section section-pad" id="pv">
        <div className="pv-frame">
          <video
            aria-label="《波下乐土》宣传片"
            controls
            onPlay={(event) => {
              event.currentTarget.muted = false;
              event.currentTarget.volume = 1;
            }}
            playsInline
            poster={assetPath("/assets/hero-kv.jpg")}
            preload="metadata"
          >
            <source
              src={assetPath("/assets/videos/sailvage-pv.mp4")}
              type="video/mp4"
            />
            你的浏览器暂不支持视频播放。
          </video>
        </div>
        <div className="pv-copy">
          <img
            className="uasa-logo"
            src={assetPath("/assets/logos/uasa.png")}
            alt="UASA"
          />
          <p>你是UASA新入职的外勤专员，被派往一个海洋生态修复项目。</p>
          <p>而很快你发现，这并非简单的环保项目。</p>
          <p>烈日海波下，所有人的秘密缓缓展开。</p>
        </div>
      </section>

      <section className="features section-pad" id="features">
        <div className="section-heading">
          <span>PLAYSTYLE</span>
          <h2>玩法</h2>
        </div>
        <div className="feature-list">
          {features.map((feature, index) => (
            <article
              className={`feature-card ${index % 2 === 1 ? "reverse" : ""}`}
              key={feature.id}
            >
              <div className="feature-media">
                <img src={feature.image} alt={feature.alt} />
                <span>{feature.id}</span>
              </div>
              <div className="feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <small>动态图待录制 · 当前为静态截图</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="characters section-pad" id="characters">
        <div className="section-heading light">
          <span>PERSONNEL FILES</span>
          <h2>角色</h2>
        </div>
        <div className="character-stage">
          <div
            className="character-tabs"
            aria-label="角色选择"
            onMouseLeave={() => setHoveredCharacterIndex(null)}
            onPointerLeave={() => setHoveredCharacterIndex(null)}
          >
            {characters.map((character, index) => {
              const isActive = character.id === activeCharacter.id;
              const dockDistance =
                hoveredCharacterIndex === null
                  ? Number.POSITIVE_INFINITY
                  : Math.abs(index - hoveredCharacterIndex);
              const dockSlot =
                dockDistance === 0
                  ? "118px"
                  : dockDistance === 1
                    ? "98px"
                    : dockDistance === 2
                      ? "86px"
                      : "76px";
              const dockScale =
                dockDistance === 0
                  ? 1.12
                  : dockDistance === 1
                    ? 1.07
                    : dockDistance === 2
                      ? 1.03
                      : 1;
              const dockLift =
                dockDistance === 0
                  ? "-24px"
                  : dockDistance === 1
                    ? "-14px"
                    : dockDistance === 2
                      ? "-7px"
                      : "0px";
              return (
                <button
                  key={character.id}
                  type="button"
                  className={isActive ? "active" : ""}
                  aria-pressed={isActive}
                  aria-label={`查看${character.nameCn}的资料`}
                  style={
                    {
                      "--tab-color": character.color,
                      "--dock-slot": dockSlot,
                      "--dock-scale": dockScale,
                      "--dock-lift": dockLift,
                      zIndex:
                        dockDistance <= 2
                          ? 20 - dockDistance
                          : isActive
                            ? 12
                            : 1,
                    } as React.CSSProperties
                  }
                  onClick={() => selectCharacter(character)}
                  onFocus={() => setHoveredCharacterIndex(index)}
                  onBlur={() => setHoveredCharacterIndex(null)}
                  onMouseEnter={() => setHoveredCharacterIndex(index)}
                  onPointerEnter={() => setHoveredCharacterIndex(index)}
                >
                  <img
                    src={assetPath(
                      `/assets/character-tabs/${character.id}.png`,
                    )}
                    alt=""
                  />
                  <span>
                    <strong>{character.nameCn}</strong>
                    {character.nameEn}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="character-display">
            <div className="character-portrait" aria-live="polite">
              {previousCharacter ? (
                <div
                  className="character-portrait-layer is-leaving"
                  data-character={previousCharacter.id}
                >
                  <img
                    src={assetPath(
                      `/assets/characters/${previousCharacter.id}.png`,
                    )}
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    className="character-portrait-shade"
                    src={assetPath(
                      `/assets/characters/${previousCharacter.id}.png`,
                    )}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              ) : null}
              <div
                className={`character-portrait-layer ${
                  previousCharacter ? "is-entering" : ""
                }`}
                data-character={activeCharacter.id}
                key={activeCharacter.id}
              >
                <img
                  src={assetPath(
                    `/assets/characters/${activeCharacter.id}.png`,
                  )}
                  alt={`${activeCharacter.nameCn}角色立绘`}
                />
                <img
                  className="character-portrait-shade"
                  src={assetPath(
                    `/assets/characters/${activeCharacter.id}.png`,
                  )}
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="character-file" aria-live="polite">
              <h3>
                <span
                  className="name-cn"
                  data-name={activeCharacter.nameCn}
                >
                  {activeCharacter.nameCn}
                </span>
                <span className="name-en">{activeCharacter.nameEn}</span>
              </h3>
              <div className="file-body">
                <p className="role">{activeCharacter.role}</p>
                <p className="intro">{activeCharacter.intro}</p>
              </div>
              <div className="dialogue">
                <p>{activeCharacter.quote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <img
          className="contact-art"
          src={assetPath("/assets/contact-scene.jpg")}
          alt="专员位于海边基地室内"
        />
        <div className="contact-panel">
          <p className="eyebrow">STAY CONNECTED</p>
          <h2>关注波下乐土</h2>
          <div className="contact-actions">
            <a href="#steam-placeholder">加入 Steam 愿望单</a>
            {/* TODO(playtest): Connect this placeholder after the email service and request flow are confirmed. */}
            <a href="#playtest-placeholder">申请 Playtest</a>
          </div>
          {/* TODO(newsletter): The form is intentionally visual-only until a mail provider is selected. */}
          <form
            className="subscribe-placeholder"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="email">邮箱订阅</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="EMAIL"
                disabled
                aria-describedby="subscribe-status"
              />
              <button type="submit" disabled>
                待开放
              </button>
            </div>
            <small id="subscribe-status">
              订阅功能将在邮件服务确认后开放
            </small>
          </form>
          <p className="contact-email">联系我们：brianbai822@gmail.com</p>
          <div className="social-placeholders" aria-label="社交媒体链接待开放">
            <span>小红书</span>
            <span>bilibili</span>
            <span>抖音</span>
          </div>
        </div>
      </section>

      <footer>
        <img
          src={assetPath("/assets/logos/emptex-head.png")}
          alt="Studio EmpteX"
        />
        <p>© 2026 Studio EmpteX. All rights reserved.</p>
        <div>
          <span>隐私政策</span>
          {/* TODO(press-kit): Keep this as a non-clickable placeholder until Press Kit content is supplied. */}
          <span>Press Kit</span>
          <a href="mailto:brianbai822@gmail.com">联系邮箱</a>
        </div>
      </footer>
    </main>
  );
}
