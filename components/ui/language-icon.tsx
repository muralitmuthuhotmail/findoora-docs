import React from "react";

export interface LanguageIconProps extends React.SVGProps<SVGSVGElement> {
  language: string;
  size?: number;
  color?: string;
}

const languageIconMap: Record<string, string> = {
  javascript: "FaJs",
  typescript: "FaJs",
  jsx: "FaReact",
  python: "FaPython",
  java: "FaJava",
  csharp: "FaCSharp",
  ruby: "FaRuby",
  go: "FaGo",
  php: "FaPhp",
  html: "FaHtml5",
  css: "FaCss3Alt",
  bash: "FaTerminal",
  sql: "FaDatabase",
  json: "FaFileCode",
  xml: "FaFileCode",
  markdown: "FaMarkdown",
  mermaid: "FaChartPie",
  shell: "FaTerminal",
  docker: "FaDocker",
  kubernetes: "FaKubernetes",
  rust: "FaRust",
  swift: "FaSwift",
  kotlin: "FaJava",
  scala: "FaScala",
  lua: "FaLua",
  elixir: "FaElixir",
  haskell: "FaHaskell",
  clojure: "FaClojure",
  erlang: "FaErlang",
  perl: "FaPerl",
  assembly: "FaMicrochip",
  powershell: "FaWindows",
  vba: "FaMicrosoft",
  dart: "FaDart",
  flutter: "FaFlutter",
  r: "FaRProject",
  matlab: "FaMath",
  julia: "FaJulia",
  crystal: "FaCrystal",
  objectivec: "FaApple",
  swiftui: "FaApple",
  vue: "FaVuejs",
  angular: "FaAngular",
  react: "FaReact",
  svelte: "FaSvelte",
  nextjs: "FaReact",
  nuxtjs: "FaVuejs",
  express: "FaNodeJs",
  nestjs: "FaNodeJs",
  laravel: "FaLaravel",
  symfony: "FaSymfony",
  django: "FaDjango",
  flask: "FaFlask",
  spring: "FaJava",
  aspnet: "FaMicrosoft",
  rails: "FaRuby",
  phoenix: "FaPhoenixFramework",
  fastapi: "FaPython",
  tornado: "FaPython",
  bottle: "FaPython",
  pyramid: "FaPython",
  play: "FaJava",
  grails: "FaJava",
  struts: "FaJava",
  vertx: "FaJava",
  akka: "FaScala",
  akkahttp: "FaScala",
  lagom: "FaScala",
};

export const LanguageIcon: React.FC<LanguageIconProps> = ({
  language,
  size = 24,
  color = "inherit",
  ...props
}) => {
  const iconName = languageIconMap[language.toLowerCase()] || "FaCode";
  const Icon = React.lazy(() =>
    import("react-icons/fa").then((icons) => {
      const validIconName = iconName as keyof typeof icons;
      const IconComponent = icons[validIconName] || icons["FaCode"];
      if (
        typeof IconComponent === "function" ||
        (typeof IconComponent === "object" && IconComponent !== null)
      ) {
        return {
          default: IconComponent as React.ComponentType<
            Omit<LanguageIconProps, "language">
          >,
        };
      }
      // fallback to a dummy component if icon not found
      return {
        default: () => (
          <span
            style={{ width: size, height: size, display: "inline-block" }}
          />
        ),
      };
    }),
  );
  return (
    <React.Suspense
      fallback={
        <span style={{ width: size, height: size, display: "inline-block" }} />
      }
    >
      <Icon size={size} color={color} {...props} />
    </React.Suspense>
  );
};
