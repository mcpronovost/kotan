import { IconAtom2, IconBell, IconMoodSmile, IconLogin2, IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { MokpButton, MokpLink } from "@/components/ui";
import MokpCoreHeaderMenu from "./Menu";

export default function MokpCoreHeader() {
  const { route, n } = useRouter();
  const { t } = useTranslation();

  return (
    <header className="mokp-core-header">
      <div className="mokp-core-header-brand">
        <span className="mokp-core-header-brand-logo">
          <IconAtom2 size={24} />
        </span>
        <span className="mokp-core-header-brand-name">
          <MokpLink route="home">Kotan</MokpLink>
        </span>
      </div>
      <MokpCoreHeaderMenu />
      <div className="mokp-core-header-space"></div>
      {/*<div className="mokp-core-header-inbox">
        <div>
          <IconBell size={20} />
        </div>
        <div>
          <IconMoodSmile size={20} />
        </div>
      </div>
      <hr className="mokp-core-header-divider" />
      <div className="mokp-core-header-user">
        <div className="mokp-dropdown">
          <div className="mokp-dropdown-toggle">
            <div className="mokp-core-header-user-name">
              <MokpLink route="register">mcpronovost</MokpLink>
            </div>
            <div className="mokp-core-header-user-avatar">
              <div className="mokp-avatar"></div>
            </div>
          </div>
        </div>
      </div>*/}
      <div className="mokp-core-header-auth">
        <MokpLink route="login"><IconLogin2 size={20} />{t("Login")}</MokpLink>
        <MokpButton label={t("Register")} route="register" variant="accent" />
      </div>
    </header>
  );
}
