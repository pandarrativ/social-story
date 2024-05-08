import { useState } from "react";
import "./message-block-single.css";

function MessageBlockSingle({
  title,
  content,
  prompt,
  onTitleChange,
  onContentChange,
  onPromptChange,
  regenerateContent,
  openPrompt,
}) {
  const [showPrompt, setShowPrompt] = useState(
    openPrompt === undefined ? false : openPrompt
  );

  return (
    <div className="message-block flex flex-col gap-0">
      <div className="message-block-header flex flex-row gap-2 w-full py-2 px-4 items-center">
        <input
          type="text"
          className="message-block-title font-semibold outline-none"
          placeholder="Presenting"
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <textarea
        className="textarea-message-block text-small1 mblock-content-prompt min-h-50"
        placeholder="Content Description"
        value={content}
        onChange={onContentChange}
      ></textarea>
    </div>
  );
}

export default MessageBlockSingle;
