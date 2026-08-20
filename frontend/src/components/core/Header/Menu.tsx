import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { MokpLink } from "@/components/ui";

const menu = [
  {
    name: "Settlement",
    route: "settlement",
  },
  {
    name: "Worldmap",
    route: "worldmap",
    disabled: true,
  },
  {
    name: "Leaderboard",
    route: "leaderboard",
  },
  {
    name: "Market",
    route: "market",
    disabled: true,
  },
  {
    name: "Quests",
    route: "quests",
    disabled: true,
  },
];

export default function MokpCoreHeaderMenu() {
  const { route, n } = useRouter();
  const { t } = useTranslation();

  return (
    <nav className="mokp-core-header-menu">
      <ul className="mokp-core-header-menu-group">
        {menu.map((m) => (
          <li key={m.route} className={`mokp-core-header-menu-item ${route.name === m.route ? "mokp-active" : ""}`}>
            <MokpLink route={m.route} disabled={m.disabled}>
              {t(m.name)}
            </MokpLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
