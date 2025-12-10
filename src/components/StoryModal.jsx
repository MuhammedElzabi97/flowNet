import { useState } from "react";
import { ArrowLeft, Type as TextIcon, Upload } from "lucide-react";
import { dummyStoriesData } from "../assets/assets";

const StoryModal = ({ setShowModal, fetchStories, onCreateStory }) => {
  const bgColors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [media, setMedia] = useState(null);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMode("media");
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetState = () => {
    setMode("text");
    setMedia(null);
    setPreviewUrl(null);
    setText("");
    setBackground(bgColors[0]);
  };

  const handleCreateStory = async () => {
    // validation بسيطة
    if (mode === "text" && !text.trim()) return;
    if (mode === "media" && !previewUrl) return;

    // نكوّن ستوري جديدة (محلياً)
    const baseUser = dummyStoriesData[0]?.user;

    const newStory = {
      user: baseUser,
      content: mode === "text" ? text : "",
      media_type:
        mode === "media"
          ? media?.type?.startsWith("image")
            ? "image"
            : "video"
          : "text",
      media_url: mode === "media" ? previewUrl : null,
      background_color: mode === "text" ? background : null,
      createdAt: new Date().toISOString(),
    };

    if (typeof onCreateStory === "function") {
      onCreateStory(newStory); // نضيفها للستيت في StoriesBar
    }

    // لاحقاً مع API ممكن ترجع تفعل fetchStories هنا
    // if (typeof fetchStories === "function") await fetchStories();

    resetState();
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-4">
        {/* Header */}
        <div className="text-center mb-4 flex items-center justify-between">
          <button
            className="text-white p-2 cursor-pointer"
            onClick={() => {
              resetState();
              setShowModal(false);
            }}
          >
            <ArrowLeft />
          </button>

          <h2 className="text-lg font-semibold">Create Story</h2>

          <span className="w-10" />
        </div>

        {/* Preview card */}
        <div
          className="rounded-lg h-96 flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: background }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none placeholder:text-white/60"
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}

          {mode === "media" && previewUrl && (
            media?.type?.startsWith("image") ? (
              <img
                src={previewUrl}
                alt=""
                className="object-contain max-h-full w-full"
              />
            ) : (
              <video
                src={previewUrl}
                className="object-contain max-h-full w-full"
                controls
              />
            )
          )}
        </div>

        {/* ألوان الخلفية */}
        <div className="flex gap-2 mt-3 justify-center">
          {bgColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setBackground(color)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 rounded-full border-2 ${
                background === color ? "border-white" : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Text / Upload buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${
              mode === "text" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <TextIcon size={18} />
            <span className="text-sm font-medium">Text</span>
          </button>

          <label
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
              mode === "media" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <input
              onChange={handleMediaUpload}
              type="file"
              accept="image/*,video/*"
              className="hidden"
            />
            <Upload size={18} />
            <span className="text-sm font-medium">Photo / Video</span>
          </label>
        </div>

        {/* زر النشر */}
        <button
          onClick={handleCreateStory}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 transition-all p-2 rounded-lg font-semibold text-white"
        >
          Share Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
