import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import "./figma-prototype.css";

// The interactive prototype is built in Figma; this page only embeds it.
// The file's share setting must be "Anyone with the link can view", or the frame stays blank.
const FIGMA_FILE_KEY = "MM9PuzobXKfiWwuxxPFsqN";
const FIGMA_FILE_NAME = "TrustCheck-HCI";
const FIGMA_PAGE_ID = "1:4"; // "02 Wireframes"

// Flow starting points from the Figma file. `node` is the frame the flow begins on.
const flows = [
  { label: "Onboarding", node: "1:31" },
  { label: "Home", node: "1:40" },
  { label: "Check a message", node: "1:45" },
  { label: "Check a link", node: "1:58" },
  { label: "Scan a QR code", node: "1:71" },
  { label: "Check a screenshot", node: "1:82" },
  { label: "Error: empty message", node: "32:668" },
  { label: "Error: invalid link", node: "32:683" },
] as const;

function figmaQuery(node: string, embed: boolean) {
  const params = new URLSearchParams({
    "page-id": FIGMA_PAGE_ID,
    "node-id": node.replace(":", "-"),
    "starting-point-node-id": node,
  });
  if (embed) {
    params.set("embed-host", "share");
    params.set("scaling", "scale-down");
    params.set("content-scaling", "fixed");
    params.set("hide-ui", "1");
  }
  return params.toString();
}

export function FigmaPrototypePage() {
  const [node, setNode] = useState<string>(flows[1].node);
  const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}?${figmaQuery(node, true)}`;
  const openSrc = `https://www.figma.com/proto/${FIGMA_FILE_KEY}/${FIGMA_FILE_NAME}?${figmaQuery(node, false)}`;

  return (
    <div className="figma-page">
      <header className="figma-header">
        <Link to="/" className="figma-back">
          <ArrowLeft aria-hidden size={18} /> Back to portfolio
        </Link>
        <h1>TrustCheck prototype</h1>
        <p>
          Tap through the screens below. Pick a starting point to jump straight into one flow. All results use example
          data.
        </p>
      </header>

      <div className="figma-flows" role="group" aria-label="Starting point">
        {flows.map((f) => (
          <button
            key={f.node}
            type="button"
            className="figma-flow"
            aria-pressed={f.node === node}
            onClick={() => setNode(f.node)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="figma-stage">
        <div className="figma-frame">
          <iframe
            key={node}
            title="TrustCheck interactive prototype (Figma)"
            src={embedSrc}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      <p className="figma-fallback">
        The prototype can take a few seconds to load. Still blank?{" "}
        <a href={openSrc} target="_blank" rel="noreferrer">
          Open it in Figma <ExternalLink aria-hidden size={14} />
        </a>
      </p>
    </div>
  );
}
