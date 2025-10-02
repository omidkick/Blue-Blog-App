"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import truncateText from "@/utils/trancateText";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UpdateCommentForm from "./UpdateCommentForm";
import useDeleteComment from "../useDeleteComment";

// ===== Delete Comment =====
export function DeleteComment({ comment: { _id: id, content } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isDeleting, deleteComment } = useDeleteComment();

  const previewText = truncateText(content?.text || "نظر", 25);

  return (
    <>
      <ButtonIcon variant="red" onClick={() => setOpen(true)}>
        <TrashIcon />
      </ButtonIcon>

      <Modal
        title={`حذف ${previewText}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={previewText}
          onClose={() => setOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deleteComment(
              { id },
              {
                onSuccess: () => {
                  setOpen(false);
                  router.refresh(); // or specify the path if needed
                },
              }
            );
          }}
          disabled={isDeleting}
        />
      </Modal>
    </>
  );
}


// ===== Update Comment =====
export function UpdateComment({ comment }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonIcon variant="edit" onClick={() => setOpen(true)}>
        <PencilSquareIcon />
      </ButtonIcon>

      <Modal title="ویرایش نظر" open={open} onClose={() => setOpen(false)}>
        <UpdateCommentForm comment={comment} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
