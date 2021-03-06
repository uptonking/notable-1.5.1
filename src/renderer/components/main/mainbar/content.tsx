import React from "react";
import { connect } from "overstated";
import Main from "@renderer/containers/main";
import PopoverNoteAttachments from "@renderer/components/main/popovers/popover_note_attachments";
import PopoverTagsAttachments from "@renderer/components/main/popovers/popover_note_tags";
import Editor from "./editor";
import MultiEditor from "./multi_editor";
import Preview from "./preview";
import SplitEditor from "./split_editor";
import Toolbar from "./toolbar";

/**
 * mainbar的区域,即note编辑及查看的区域
 */
const Content = ({
  hasNote,
  isLoading,
  isEditing,
  isMultiEditing,
  isSplit,
}) => {
  if (isLoading || !hasNote) {
    // 若处于加载状态，或没有笔记文件，则只显示工具条

    return <Toolbar />;
  }

  if (isMultiEditing) {
    // 若处理多项目编辑状态，则只显示多项目菜单项
    return <MultiEditor />;
  }

  return (
    <>
      <PopoverNoteAttachments />
      <PopoverTagsAttachments />
      {/* 编辑区上面的工具条 */}
      <Toolbar />
      {/* 笔记markdown编辑区域 */}
      {isSplit ? <SplitEditor /> : isEditing ? <Editor /> : <Preview />}
    </>
  );
};

export default connect({
  container: Main,
  selector: ({ container }) => ({
    hasNote: !!container.note.get(),
    isLoading: container.loading.get(),
    isEditing: container.editor.isEditing(),
    isMultiEditing: container.multiEditor.isEditing(),
    isSplit: container.editor.isSplit(),
  }),
})(Content);
