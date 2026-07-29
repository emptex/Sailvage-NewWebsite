"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

export type Locale = "zh" | "en";
type LocalizedText = Record<Locale, string>;

type Character = {
  id: string;
  nameCn: string;
  nameEn: string;
  role: LocalizedText;
  intro: LocalizedText;
  quote: LocalizedText;
  color: string;
  themeColorWeight?: string;
  glowColorWeight?: string;
};

const characters: Character[] = [
  {
    id: "agent",
    nameCn: "专员",
    nameEn: "Agent",
    role: {
      zh: "执行部／B级专员",
      en: "DEPARTMENT OF EXPEDITION / B-RANK AGENT",
    },
    intro: {
      zh: "你是一个新入职的执行部专员，你勤勤恳恳上班，偷偷摸摸划水，偶尔找点刺激！",
      en: "A newly hired agent in the Department of Expedition: diligent on the clock, discreetly slacking off, and always ready for the occasional thrill.",
    },
    quote: {
      zh: "阳光沙滩椰子鸡……好工作啊！",
      en: "Sunshine, beaches, coconut chicken... What a great job!",
    },
    color: "#352D27",
  },
  {
    id: "hikaru",
    nameCn: "三宅光",
    nameEn: "Miyake Hikaru",
    role: {
      zh: "生态部／部长",
      en: "DEPARTMENT OF ECOLOGY / DEPARTMENT HEAD",
    },
    intro: {
      zh: "剪除徒长的枝条，维系庭院的繁荣。可能并非看起来那样不近人情。",
      en: "Prunes overgrown branches to preserve the garden's prosperity. Perhaps not as unapproachable as they seem.",
    },
    quote: {
      zh: "欢迎加入波下乐土。外勤工作辛苦，务必注意身体。",
      en: "Welcome to Sailvage. Field work is demanding, so please take care of yourself.",
    },
    color: "#D7C60D",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
  {
    id: "selene",
    nameCn: "塞勒涅·玛刻檀丝",
    nameEn: "Selene Mactons",
    role: {
      zh: "生态部／生态监测科主任",
      en: "DEPARTMENT OF ECOLOGY / ECOLOGICAL MONITORING DIVISION DIRECTOR",
    },
    intro: {
      zh: "喜欢听一些闲话。而足够精彩的闲话能换取不菲的利益。",
      en: "Fond of a good rumor. The most fascinating ones can be traded for a handsome profit.",
    },
    quote: {
      zh: "秘密的价格是……更昂贵的秘密。",
      en: "The price of a secret is... an even more expensive secret.",
    },
    color: "#9740F4",
  },
  {
    id: "lin",
    nameCn: "叶琳",
    nameEn: "Lin Ye",
    role: {
      zh: "生态部／总顾问",
      en: "DEPARTMENT OF ECOLOGY / SENIOR ADVISOR",
    },
    intro: {
      zh: "她有足够多的耐心，足够多的爱意去守护那片梦中无限延伸的森林。",
      en: "She has patience enough, and love enough, to protect the forest that stretches without end through her dreams.",
    },
    quote: {
      zh: "这里的环境总是有些急躁，慢慢来就好。",
      en: "Things here are always in such a hurry. Take your time.",
    },
    color: "#105C3B",
  },
  {
    id: "vasco",
    nameCn: "瓦斯科·索萨",
    nameEn: "Vasco Sousa",
    role: {
      zh: "海洋部／海洋资源科主任",
      en: "DEPARTMENT OF OCEANOGRAPHY / MARINE RESOURCES DIVISION DIRECTOR",
    },
    intro: {
      zh: "是个世俗的人，比起宏大的人类理想，他更在意人与人之间质朴的感情。",
      en: "A worldly man who values simple human bonds more than humanity's grand ideals.",
    },
    quote: {
      zh: "按时吃饭，安全回来。不只是你，还有其他的所有人。",
      en: "Eat on time and come back safely. That goes for you—and everyone else.",
    },
    color: "#D54215",
  },
  {
    id: "cypsel",
    nameCn: "希普赛尔·雷莫西",
    nameEn: "Cypsel Lemus",
    role: {
      zh: "执行部／EX级专员",
      en: "DEPARTMENT OF EXPEDITION / EX-RANK AGENT",
    },
    intro: {
      zh: "一个肾上腺素爱好者。永远在路上，永远不停歇。",
      en: "An adrenaline enthusiast. Always on the move, never slowing down.",
    },
    quote: {
      zh: "放轻松～你负责完成任务，我负责你。",
      en: "Relax. You handle the mission, and I'll handle you.",
    },
    color: "#16A8D0",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
  {
    id: "unati",
    nameCn: "尤那提·伍德付雅",
    nameEn: "Unati Woodfire",
    role: {
      zh: "生态部／微观生态科研究员",
      en: "DEPARTMENT OF ECOLOGY / MICROECOLOGY DIVISION RESEARCHER",
    },
    intro: {
      zh: "新生代研究员，在一切奇异的领域有着超乎常人的热情。",
      en: "A new-generation researcher with extraordinary enthusiasm for every strange field of study.",
    },
    quote: {
      zh: "微观生态的美丽，可不是俗套的脊椎动物能比拟的！",
      en: "The beauty of microecology is beyond comparison with those pedestrian vertebrates!",
    },
    color: "#C50E7F",
    themeColorWeight: "90%",
    glowColorWeight: "42%",
  },
];

const features = [
  {
    id: "01",
    image: assetPath("/assets/feature-combat.png"),
    alt: {
      zh: "即时卡牌战斗游戏截图",
      en: "Real-time card combat gameplay screenshot",
    },
    title: {
      zh: "海波之下，乐土飘摇",
      en: "Paradise Adrift",
    },
    body: {
      zh: "卡牌Roguelite，但是即时战斗。与海下的敌人交锋，在走位与时机中保护波下乐土！",
      en: "A card-based roguelite with real-time combat. Face enemies beneath the sea and protect Sailvage through movement, positioning, and precise timing.",
    },
  },
  {
    id: "02",
    image: assetPath("/assets/feature-hub.png"),
    alt: {
      zh: "基地对话游戏截图",
      en: "Base conversation gameplay screenshot",
    },
    title: {
      zh: "结识伙伴，听闻秘辛",
      en: "Allies and Secrets",
    },
    body: {
      zh: "在基地中与你的同事们交谈，遇见一些形形色色的人，了解一些神神秘秘的事。",
      en: "Talk with your colleagues at the base, meet a colorful cast of characters, and uncover more than a few mysterious stories.",
    },
  },
  {
    id: "03",
    image: assetPath("/assets/feature-deck.png"),
    alt: {
      zh: "卡牌构筑游戏截图",
      en: "Card deckbuilding gameplay screenshot",
    },
    title: {
      zh: "生态之间，亦有共鸣",
      en: "Ecologies in Resonance",
    },
    body: {
      zh: "构筑你的卡组，体验数十种不同流派。每个物种的兴衰，都是一场蝴蝶效应。",
      en: "Build your deck and explore dozens of distinct strategies. The rise and fall of every species can set off a butterfly effect.",
    },
  },
];

const siteCopy = {
  zh: {
    brandAlt: "波下乐土",
    navLabel: "主导航",
    nav: ["首页", "PV", "玩法", "角色", "联系"],
    languageLabel: "Switch to English",
    heroAlt: "波下乐土主要角色视觉图",
    steamAria: "Steam 愿望单链接待开放",
    steamTop: "加入 STEAM",
    steamBottom: "愿望单",
    videoLabel: "《波下乐土》宣传片",
    videoFallback: "你的浏览器暂不支持视频播放。",
    pv: [
      "你是UASA新入职的外勤专员，被派往一个海洋生态修复项目。",
      "而很快你发现，这并非简单的环保项目。",
      "烈日海波下，所有人的秘密缓缓展开。",
    ],
    featuresTitle: "玩法",
    featureStatus: "动态图待录制 · 当前为静态截图",
    charactersTitle: "角色",
    characterSelector: "角色选择",
    contactArtAlt: "专员位于海边基地室内",
    contactTitle: "关注波下乐土",
    wishlist: "加入 Steam 愿望单",
    playtest: "申请 Playtest",
    newsletter: "邮箱订阅",
    comingSoon: "待开放",
    newsletterStatus: "订阅功能将在邮件服务确认后开放",
    contactEmail: "联系我们：brianbai822@gmail.com",
    socialLabel: "社交媒体链接待开放",
    socials: ["小红书", "bilibili", "抖音"],
    privacy: "隐私政策",
    emailLink: "联系邮箱",
  },
  en: {
    brandAlt: "Sailvage",
    navLabel: "Primary navigation",
    nav: ["HOME", "PV", "GAMEPLAY", "CHARACTERS", "CONTACT"],
    languageLabel: "切换至中文版",
    heroAlt: "Key visual featuring the main cast of Sailvage",
    steamAria: "Steam wishlist link coming soon",
    steamTop: "WISHLIST ON",
    steamBottom: "STEAM",
    videoLabel: "Sailvage promotional video",
    videoFallback: "Your browser does not support embedded video playback.",
    pv: [
      "You are a newly hired UASA field agent assigned to a marine ecosystem restoration project.",
      "But you soon discover it is no ordinary environmental mission.",
      "Beneath sunlit waves, everyone's secrets begin to surface.",
    ],
    featuresTitle: "GAMEPLAY",
    featureStatus: "Animated footage pending · static screenshot shown",
    charactersTitle: "CHARACTERS",
    characterSelector: "Character selection",
    contactArtAlt: "An agent inside the seaside base",
    contactTitle: "FOLLOW SAILVAGE",
    wishlist: "WISHLIST ON STEAM",
    playtest: "REQUEST PLAYTEST",
    newsletter: "EMAIL UPDATES",
    comingSoon: "COMING SOON",
    newsletterStatus:
      "Subscriptions will open after the email service is confirmed",
    contactEmail: "Contact: brianbai822@gmail.com",
    socialLabel: "Social media links coming soon",
    socials: ["Xiaohongshu", "bilibili", "Douyin"],
    privacy: "PRIVACY POLICY",
    emailLink: "EMAIL",
  },
} as const;

export default function EnglishPage() {
  const locale: Locale = "en";
  const copy = siteCopy[locale];
  const isEnglish = locale === "en";
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
      className={`site-shell locale-${locale}`}
      lang={isEnglish ? "en" : "zh-CN"}
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

        @font-face {
          font-display: swap;
          font-family: "Jost";
          font-style: normal;
          font-weight: 100 900;
          src: url("${assetPath("/fonts/jost-variable.ttf")}") format("truetype");
        }
      `}</style>
      <header className="site-header">
        <a
          className="brand-lockup"
          href="#home"
          aria-label={isEnglish ? "Back to home" : "返回首页"}
        >
          <img
            src={assetPath(
              isEnglish
                ? "/assets/logos/sailvage.png"
                : "/assets/logos/sailvage-cn.png",
            )}
            alt={copy.brandAlt}
          />
        </a>
        <nav aria-label={copy.navLabel}>
          <a href="#home">{copy.nav[0]}</a>
          <a href="#pv">{copy.nav[1]}</a>
          <a href="#features">{copy.nav[2]}</a>
          <a href="#characters">{copy.nav[3]}</a>
          <a href="#contact">{copy.nav[4]}</a>
        </nav>
        <a
          className="language-switch"
          href={isEnglish ? `${basePath}/` : `${basePath}/en/`}
          hrefLang={isEnglish ? "zh-CN" : "en"}
          lang={isEnglish ? "zh-CN" : "en"}
          aria-label={copy.languageLabel}
        >
          中 / EN
        </a>
      </header>

      <section className="hero" id="home">
        <img
          className="hero-art"
          src={assetPath("/assets/hero-kv.jpg")}
          alt={copy.heroAlt}
        />
        {/* TODO(steam): Replace this placeholder with the Steam store URL and official logo asset after registration. */}
        <a
          className="steam-float"
          href="#steam-placeholder"
          aria-label={copy.steamAria}
        >
          <span className="steam-symbol" aria-hidden="true">
            ●━○
          </span>
          <span>
            {copy.steamTop}
            <strong>{copy.steamBottom}</strong>
          </span>
        </a>
        {/* TODO(animation): Add the confirmed one-second intro sequence in a later phase. */}
      </section>

      <section className="pv-section section-pad" id="pv">
        <div className="pv-frame">
          <video
            aria-label={copy.videoLabel}
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
            {copy.videoFallback}
          </video>
        </div>
        <div className="pv-copy">
          <img
            className="uasa-logo"
            src={assetPath("/assets/logos/uasa.png")}
            alt="UASA"
          />
          {copy.pv.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="features section-pad" id="features">
        <div className="section-heading">
          <span>PLAYSTYLE</span>
          <h2>{copy.featuresTitle}</h2>
        </div>
        <div className="feature-list">
          {features.map((feature, index) => (
            <article
              className={`feature-card ${index % 2 === 1 ? "reverse" : ""}`}
              key={feature.id}
            >
              <div className="feature-media">
                <img src={feature.image} alt={feature.alt[locale]} />
                <span>{feature.id}</span>
              </div>
              <div className="feature-copy">
                <h3>{feature.title[locale]}</h3>
                <p>{feature.body[locale]}</p>
                <small>{copy.featureStatus}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="characters section-pad" id="characters">
        <div className="section-heading light">
          <span>PERSONNEL FILES</span>
          <h2>{copy.charactersTitle}</h2>
        </div>
        <div className="character-stage">
          <div
            className="character-tabs"
            aria-label={copy.characterSelector}
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
                  aria-label={
                    isEnglish
                      ? `View ${character.nameEn}'s profile`
                      : `查看${character.nameCn}的资料`
                  }
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
                    <strong>{character.nameEn}</strong>
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
                  alt={
                    isEnglish
                      ? `Character portrait of ${activeCharacter.nameEn}`
                      : `${activeCharacter.nameCn}角色立绘`
                  }
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
              <h3 aria-label={activeCharacter.nameEn}>
                <span
                  className="name-primary"
                  data-name={
                    isEnglish
                      ? activeCharacter.nameEn
                      : activeCharacter.nameCn
                  }
                >
                  {activeCharacter.nameEn}
                </span>
              </h3>
              <div className="file-body">
                <p className="role">{activeCharacter.role[locale]}</p>
                <p className="intro">{activeCharacter.intro[locale]}</p>
              </div>
              <div className="dialogue">
                <p>{activeCharacter.quote[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <img
          className="contact-art"
          src={assetPath("/assets/contact-scene.jpg")}
          alt={copy.contactArtAlt}
        />
        <div className="contact-panel">
          <p className="eyebrow">STAY CONNECTED</p>
          <h2>{copy.contactTitle}</h2>
          <div className="contact-actions">
            <a href="#steam-placeholder">{copy.wishlist}</a>
            {/* TODO(playtest): Connect this placeholder after the email service and request flow are confirmed. */}
            <a href="#playtest-placeholder">{copy.playtest}</a>
          </div>
          {/* TODO(newsletter): The form is intentionally visual-only until a mail provider is selected. */}
          <form
            className="subscribe-placeholder"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor={`email-${locale}`}>{copy.newsletter}</label>
            <div>
              <input
                id={`email-${locale}`}
                type="email"
                placeholder="EMAIL"
                disabled
                aria-describedby={`subscribe-status-${locale}`}
              />
              <button type="submit" disabled>
                {copy.comingSoon}
              </button>
            </div>
            <small id={`subscribe-status-${locale}`}>
              {copy.newsletterStatus}
            </small>
          </form>
          <p className="contact-email">{copy.contactEmail}</p>
          <div
            className="social-placeholders"
            aria-label={copy.socialLabel}
          >
            {copy.socials.map((social) => (
              <span key={social}>{social}</span>
            ))}
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
          <span>{copy.privacy}</span>
          {/* TODO(press-kit): Keep this as a non-clickable placeholder until Press Kit content is supplied. */}
          <span>Press Kit</span>
          <a href="mailto:brianbai822@gmail.com">{copy.emailLink}</a>
        </div>
      </footer>
    </main>
  );
}
