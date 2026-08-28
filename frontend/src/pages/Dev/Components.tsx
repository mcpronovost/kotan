import "@/assets/styles/page/components.scss";
import { useEffect, useState, type ReactNode } from "react";
import { IconHome, IconLock, IconLogin2, IconMail, IconUser } from "@tabler/icons-react";
import { useRouter } from "@/services/router";
import {
  MokpAlert,
  MokpButton,
  MokpCard,
  MokpData,
  MokpDivider,
  MokpForm,
  MokpGrid,
  MokpHeading,
  MokpLink,
} from "@/components/ui";

type TypePropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  details: string;
};

const COMPONENTS = [
  { id: "alert", name: "Alert" },
  { id: "button", name: "Button" },
  { id: "card", name: "Card" },
  { id: "data", name: "Data" },
  { id: "divider", name: "Divider" },
  { id: "form", name: "Form" },
  { id: "grid", name: "Grid" },
  { id: "heading", name: "Heading" },
  { id: "link", name: "Link" },
];

function PropTable({ rows }: { rows: TypePropRow[] }) {
  return (
    <table className="mokp-page-dev-components-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Default</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>
              <code>{row.name}</code>
            </td>
            <td>
              <code>{row.type}</code>
            </td>
            <td>{row.defaultValue ? <code>{row.defaultValue}</code> : "—"}</td>
            <td>{row.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Usage({ children }: { children: string }) {
  return (
    <pre className="mokp-page-dev-components-code">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  id,
  title,
  file,
  exportName,
  description,
  children,
}: {
  id: string;
  title: string;
  file: string;
  exportName: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mokp-page-dev-components-section">
      <MokpCard>
        <h2 style={{ fontSize: "1.25rem", margin: "0 0 4px" }}>{title}</h2>
        <p className="mokp-page-dev-components-meta">
          <code>{exportName}</code> · <code>{file}</code>
        </p>
        <p className="mokp-page-dev-components-description">{description}</p>
        {children}
      </MokpCard>
    </section>
  );
}

export default function MokpDevComponents() {
  const { routeTitle } = useRouter();
  const [formData, setFormData] = useState({
    username: "settler",
    email: "",
    password: "Abcd1234",
    terms: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formAlert, setFormAlert] = useState<{ error?: string; success?: string }>({});

  useEffect(() => {
    routeTitle("UI components");
    return () => routeTitle();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormAlert({});
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setFormAlert({ success: "Form submitted. This is a library preview only." });
    }, 700);
  };

  return (
    <MokpGrid className="mokp-page-dev-components">
      <MokpGrid.Row>
        <MokpGrid.Col>
          <MokpHeading title="UI library" tag="h1" />
          <p className="mokp-page-dev-components-intro">
            Live catalogue of every component exported from <b>frontend/src/components/ui</b>. Each section lists
            fields, defaults, usage, and a working example.
          </p>
        </MokpGrid.Col>
      </MokpGrid.Row>
      <MokpGrid.Row>
        <MokpGrid.Col col="20" md="100">
          <MokpCard>
            <nav className="mokp-page-dev-components-toc" aria-label="Component index">
              {COMPONENTS.map((item) => (
                <a key={item.id} className="mokp-page-dev-components-toc-link" href={`#${item.id}`}>
                  {item.name}
                </a>
              ))}
            </nav>
          </MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="80" md="100" nop>
          <MokpGrid.Row wrap>
            <MokpGrid.Col>
              <Section
                id="alert"
                title="Alert"
                exportName="MokpAlert"
                file="components/ui/Alert.tsx"
                description="Status banner for success, danger, info, warning, express, or default messages. Use title, message, children, or a mix. Ghost renders a dashed, translucent treatment."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "title", type: "string", details: "Optional heading inside the alert." },
                    { name: "message", type: "string", details: "Optional body copy." },
                    {
                      name: "variant",
                      type: '"default" | "success" | "danger" | "info" | "warning" | "express"',
                      defaultValue: '"default"',
                      details: "Colour and default icon.",
                    },
                    { name: "ghost", type: "boolean", defaultValue: "false", details: "Dashed, low-fill style." },
                    { name: "showIcon", type: "boolean", defaultValue: "true", details: "Toggles the leading icon." },
                    { name: "icon", type: "ReactNode", details: "Replaces the variant icon." },
                    { name: "children", type: "ReactNode", details: "Extra content under title and message." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <div className="mokp-page-dev-components-preview">
                  <MokpAlert variant="default" title="Default" message="Neutral status." />
                  <MokpAlert variant="success" title="Success" message="Settlement saved." />
                  <MokpAlert variant="danger" title="Danger" message="Unable to reach the server." />
                  <MokpAlert variant="info" title="Info" message="A new season starts tomorrow." />
                  <MokpAlert variant="warning" title="Warning" message="Food stores are running low." />
                  <MokpAlert variant="express" title="Express" message="A raid is incoming." />
                  <MokpAlert variant="danger" ghost title="Ghost" message="Same variants support ghost." />
                  <MokpAlert showIcon={false} title="No icon" message="showIcon={false}" />
                </div>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpAlert variant="danger" title="Unable to save" message="Please try again." />
<MokpAlert variant="success" ghost title="Saved" />`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="button"
                title="Button"
                exportName="MokpButton"
                file="components/ui/Button.tsx"
                description="Action control. Can run onClick, submit a form, or navigate with route and params. Loading overlays the label with a spinner. Block stretches to full width."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "children", type: "ReactNode", details: "Inner content besides label." },
                    { name: "label", type: "string", details: "Primary label text." },
                    { name: "route", type: "string", details: "Named route to open on click." },
                    { name: "params", type: "TypeRouteParams", defaultValue: "{}", details: "Route parameters." },
                    {
                      name: "type",
                      type: '"button" | "submit" | "reset"',
                      defaultValue: '"button"',
                      details: "Native button type. Submit is not prevented.",
                    },
                    {
                      name: "variant",
                      type: '"default" | "accent" | "card" | "success" | "danger" | "info" | "warning" | "express"',
                      defaultValue: '"default"',
                      details: "Visual treatment. Styled variants today: default, card, accent, danger.",
                    },
                    { name: "prependIcon", type: "Icon", details: "Tabler icon before the label." },
                    { name: "appendIcon", type: "Icon", details: "Tabler icon after the label." },
                    {
                      name: "disabled",
                      type: "boolean",
                      defaultValue: "false",
                      details: "Blocks click and navigation.",
                    },
                    { name: "loading", type: "boolean", defaultValue: "false", details: "Shows the spinner overlay." },
                    { name: "onClick", type: "() => void", details: "Used when no route is set." },
                    { name: "block", type: "boolean", defaultValue: "false", details: "Full-width button." },
                    { name: "className", type: "string", defaultValue: '""', details: "Extra class names." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <div className="mokp-page-dev-components-preview">
                  <div className="mokp-page-dev-components-preview-row">
                    <MokpButton label="Default" />
                    <MokpButton label="Accent" variant="accent" />
                    <MokpButton label="Card" variant="card" />
                    <MokpButton label="Danger" variant="danger" />
                    <MokpButton label="Success" variant="success" />
                    <MokpButton label="Info" variant="info" />
                    <MokpButton label="Warning" variant="warning" />
                    <MokpButton label="Express" variant="express" />
                  </div>
                  <div className="mokp-page-dev-components-preview-row">
                    <MokpButton label="With icon" variant="accent" prependIcon={IconLogin2} />
                    <MokpButton label="Disabled" disabled />
                    <MokpButton label="Loading" loading />
                    <MokpButton label="Home" route="home" prependIcon={IconHome} />
                  </div>
                  <MokpButton label="Block button" variant="accent" block />
                </div>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpButton label="Log in" variant="accent" prependIcon={IconLogin2} />
<MokpButton label="Create an account" route="register" block />
<MokpButton type="submit" label="Save" loading={isLoading} />`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="card"
                title="Card"
                exportName="MokpCard"
                file="components/ui/Card.tsx"
                description="Surface container with the card background, border, and radius. Forwards extra HTML attributes, so style and className work as usual."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "children", type: "ReactNode", details: "Card body." },
                    { name: "...props", type: "HTMLAttributes", details: "Passed to the root div." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpCard>
                  <strong>Settlement overview</strong>
                  <p style={{ color: "var(--mokp-card-fg-subtle)", margin: "8px 0 0" }}>
                    Nested cards stack with a top margin. Use Grid columns to place cards side by side.
                  </p>
                </MokpCard>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpCard>
  <h2>Title</h2>
  <p>Body copy</p>
</MokpCard>`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="data"
                title="Data"
                exportName="MokpData"
                file="components/ui/Data.tsx"
                description="Definition list for labelled values. Compound parts: MokpData.Key and MokpData.Value. Keys can take an optional icon."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "children", type: "ReactNode", details: "Key and Value pairs on MokpData." },
                    { name: "icon", type: "ReactNode", details: "Optional leading icon on Key." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpData>
                  <MokpData.Key icon={<IconHome size={16} />}>Settlement</MokpData.Key>
                  <MokpData.Value>Kamuy</MokpData.Value>
                </MokpData>
                <MokpData>
                  <MokpData.Key>Population</MokpData.Key>
                  <MokpData.Value>128</MokpData.Value>
                </MokpData>
                <MokpData>
                  <MokpData.Key>Food</MokpData.Key>
                  <MokpData.Value>Adequate</MokpData.Value>
                </MokpData>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpData>
  <MokpData.Key icon={<IconHome size={16} />}>Settlement</MokpData.Key>
  <MokpData.Value>Kamuy</MokpData.Value>
</MokpData>`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="divider"
                title="Divider"
                exportName="MokpDivider"
                file="components/ui/Divider.tsx"
                description="Horizontal rule with an optional centred label (text or node). Use between form actions or card sections."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "label", type: "ReactNode", details: "Optional centre label." },
                    { name: "children", type: "ReactNode", details: "Optional extra content in the separator." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpDivider />
                <MokpDivider label="or" />
                <MokpDivider label={<IconHome size={15} color="var(--mokp-c-accent)" />} />
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpDivider />
<MokpDivider label="or" />
<MokpDivider label={<IconAtom2 size={15} />} />`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="form"
                title="Form"
                exportName="MokpForm"
                file="components/ui/Form.tsx"
                description="Form shell plus Field and Alert. Field supports text, email, password (with reveal), and checkbox. Help text, live checklists, and native or passed errors. Alert wraps MokpAlert for form-level success and danger."
              >
                <h3 className="mokp-page-dev-components-subtitle">MokpForm fields</h3>
                <PropTable
                  rows={[
                    { name: "loading", type: "boolean", details: "Ignores submit while true." },
                    { name: "onSubmit", type: "(event) => void", details: "Called after preventDefault." },
                    { name: "children", type: "ReactNode", details: "Fields, alerts, and actions." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">MokpForm.Field fields</h3>
                <PropTable
                  rows={[
                    {
                      name: "type",
                      type: "string",
                      defaultValue: '"text"',
                      details: '"text", "email", "password", or "checkbox".',
                    },
                    { name: "name", type: "string", details: "Input name and id suffix." },
                    { name: "label", type: "string", details: "Visible label." },
                    { name: "hideLabel", type: "boolean", defaultValue: "false", details: "Hides the label row." },
                    { name: "placeholder", type: "string", details: "Placeholder on text inputs." },
                    { name: "required", type: "boolean", defaultValue: "false", details: "Shows a required marker." },
                    { name: "helptext", type: "string", details: "Hint under the input when there is no error." },
                    {
                      name: "helplist",
                      type: "{ label: string; test: (value: string) => boolean }[]",
                      details: "Live checklist, shown once the field has a value.",
                    },
                    { name: "icon", type: "Icon", details: "Tabler icon in the prepend slot." },
                    { name: "value", type: "string | boolean", details: "Controlled value; checkbox uses checked." },
                    { name: "error", type: "string", details: "External error; overrides native validity copy." },
                    { name: "onChange", type: "(event) => void", details: "Receives the input change event." },
                    { name: "children", type: "ReactNode", details: "Checkbox label content." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">MokpForm.Alert fields</h3>
                <PropTable
                  rows={[
                    { name: "error", type: "string", details: "Danger message." },
                    { name: "errorTitle", type: "string", details: "Danger title." },
                    { name: "success", type: "string", details: "Success message." },
                    { name: "successTitle", type: "string", details: "Success title." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpForm loading={isLoading} onSubmit={handleFormSubmit}>
                  <MokpForm.Field
                    name="username"
                    label="Username"
                    placeholder="Enter a username"
                    required
                    icon={IconUser}
                    value={formData.username}
                    helptext="Public name other players will see."
                    onChange={handleFieldChange}
                  />
                  <MokpForm.Field
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="settler@kotan.example"
                    icon={IconMail}
                    value={formData.email}
                    error="Format invalide (ex: email doit contenir un @)"
                    onChange={handleFieldChange}
                  />
                  <MokpForm.Field
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter a password"
                    icon={IconLock}
                    value={formData.password}
                    helplist={[
                      { label: "At least 8 characters", test: (v) => v.length >= 8 },
                      { label: "Contains a number", test: (v) => /[0-9]/.test(v) },
                      { label: "Contains an uppercase letter", test: (v) => /[A-Z]/.test(v) },
                    ]}
                    onChange={handleFieldChange}
                  />
                  <MokpForm.Field
                    type="checkbox"
                    name="terms"
                    hideLabel
                    value={formData.terms}
                    onChange={handleFieldChange}
                  >
                    I agree to the sample terms for this preview.
                  </MokpForm.Field>
                  <MokpForm.Alert
                    error={formAlert.error}
                    errorTitle="An error occurred"
                    success={formAlert.success}
                    successTitle="All good"
                  />
                  <MokpButton type="submit" label="Submit example" variant="accent" loading={isLoading} block />
                </MokpForm>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpForm loading={isLoading} onSubmit={handleSubmit}>
  <MokpForm.Field name="username" label="Username" value={formData.username} icon={IconUser} onChange={handleChange} />
  <MokpForm.Field type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
  <MokpForm.Alert error={hasError?.message} errorTitle="An error occurred" />
  <MokpButton type="submit" label="Log in" variant="accent" loading={isLoading} block />
</MokpForm>`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="grid"
                title="Grid"
                exportName="MokpGrid"
                file="components/ui/Grid.tsx"
                description="Page layout: MokpGrid, MokpGrid.Row, MokpGrid.Col. Column widths are percentages (100, 75, 66, 55, 50, 45, 33, 25, 20, 15, 10) with xl, lg, md, and sm breakpoints. order / orderMd / orderSm reorder columns. wrap allows rows to wrap. nop removes inner padding. full removes the max width."
              >
                <h3 className="mokp-page-dev-components-subtitle">MokpGrid fields</h3>
                <PropTable
                  rows={[
                    { name: "full", type: "boolean", defaultValue: "false", details: "No max-width constraint." },
                    { name: "className", type: "string", details: "Extra class on the section." },
                    { name: "children", type: "ReactNode", details: "Rows and other content." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">MokpGrid.Row fields</h3>
                <PropTable
                  rows={[
                    { name: "wrap", type: "boolean", details: "Allows columns to wrap on large screens too." },
                    { name: "className", type: "string", details: "Extra class on the row." },
                    { name: "children", type: "ReactNode", details: "Columns." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">MokpGrid.Col fields</h3>
                <PropTable
                  rows={[
                    { name: "col", type: "string", defaultValue: '"100"', details: "Base flex-basis percent." },
                    { name: "xl / lg / md / sm", type: "string", details: "Overrides at 1399 / 1199 / 1023 / 767." },
                    { name: "order", type: "number", defaultValue: "0", details: "Flex order." },
                    { name: "orderMd / orderSm", type: "number", defaultValue: "0", details: "Order at md and sm." },
                    { name: "grow", type: "boolean", defaultValue: "true", details: "Allows the column to grow." },
                    { name: "nop", type: "boolean", defaultValue: "false", details: "Removes vertical padding." },
                    { name: "children", type: "ReactNode", details: "Column content." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpGrid.Row>
                  <MokpGrid.Col col="50">
                    <div className="mokp-page-dev-components-swatch">col 50</div>
                  </MokpGrid.Col>
                  <MokpGrid.Col col="50">
                    <div className="mokp-page-dev-components-swatch">col 50</div>
                  </MokpGrid.Col>
                </MokpGrid.Row>
                <MokpGrid.Row>
                  <MokpGrid.Col col="33">
                    <div className="mokp-page-dev-components-swatch">col 33</div>
                  </MokpGrid.Col>
                  <MokpGrid.Col col="33">
                    <div className="mokp-page-dev-components-swatch">col 33</div>
                  </MokpGrid.Col>
                  <MokpGrid.Col col="33">
                    <div className="mokp-page-dev-components-swatch">col 33</div>
                  </MokpGrid.Col>
                </MokpGrid.Row>
                <MokpGrid.Row>
                  <MokpGrid.Col col="75">
                    <div className="mokp-page-dev-components-swatch">col 75</div>
                  </MokpGrid.Col>
                  <MokpGrid.Col col="25">
                    <div className="mokp-page-dev-components-swatch">col 25</div>
                  </MokpGrid.Col>
                </MokpGrid.Row>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpGrid>
  <MokpGrid.Row>
    <MokpGrid.Col col="75">Main</MokpGrid.Col>
    <MokpGrid.Col col="25" nop>
      <MokpGrid.Row wrap>
        <MokpGrid.Col>Sidebar A</MokpGrid.Col>
        <MokpGrid.Col>Sidebar B</MokpGrid.Col>
      </MokpGrid.Row>
    </MokpGrid.Col>
  </MokpGrid.Row>
</MokpGrid>`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="heading"
                title="Heading"
                exportName="MokpHeading"
                file="components/ui/Heading.tsx"
                description="Page header with a large title and accent underline. tag chooses the heading element (h1–h6). children render after the title block. description is accepted on the type but is not rendered yet."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "title", type: "string", details: "Heading text." },
                    { name: "description", type: "string", details: "Typed but unused in the component." },
                    { name: "tag", type: "string", defaultValue: '"h1"', details: "Element used for the title." },
                    { name: "children", type: "ReactNode", details: "Optional content after the title." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <MokpHeading title="Settlement" tag="h2" />
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpHeading title="Terms of Use" tag="h1" />`}</Usage>
              </Section>
            </MokpGrid.Col>

            <MokpGrid.Col>
              <Section
                id="link"
                title="Link"
                exportName="MokpLink"
                file="components/ui/Link.tsx"
                description="In-app navigation using named routes. Prevents default and calls the router unless blank is set. disabled blocks navigation. colorHover can be accent for a colour change on hover."
              >
                <h3 className="mokp-page-dev-components-subtitle">Fields</h3>
                <PropTable
                  rows={[
                    { name: "children", type: "ReactNode", details: "Link label." },
                    { name: "route", type: "string", defaultValue: '"home"', details: "Named route." },
                    { name: "params", type: "TypeRouteParams", defaultValue: "{}", details: "Route parameters." },
                    { name: "disabled", type: "boolean", defaultValue: "false", details: "Blocks navigation." },
                    {
                      name: "blank",
                      type: "boolean",
                      defaultValue: "false",
                      details: "Opens in a new tab; native navigation.",
                    },
                    { name: "colorHover", type: "string", details: 'Use "accent" for hover colour.' },
                    { name: "className", type: "string", defaultValue: '""', details: "Extra class names." },
                  ]}
                />
                <h3 className="mokp-page-dev-components-subtitle">Example</h3>
                <div className="mokp-page-dev-components-preview-row">
                  <MokpLink route="home">Home</MokpLink>
                  <MokpLink route="login">Login</MokpLink>
                  <MokpLink route="termsofuse" blank>
                    Terms of Use (new tab)
                  </MokpLink>
                  <MokpLink route="home" disabled>
                    Disabled
                  </MokpLink>
                </div>
                <h3 className="mokp-page-dev-components-subtitle">Usage</h3>
                <Usage>{`<MokpLink route="login">Login</MokpLink>
<MokpLink route="termsofuse" blank>terms of use</MokpLink>
<MokpLink route="worldmap" disabled>Worldmap</MokpLink>`}</Usage>
              </Section>
            </MokpGrid.Col>
          </MokpGrid.Row>
        </MokpGrid.Col>
      </MokpGrid.Row>
    </MokpGrid>
  );
}
