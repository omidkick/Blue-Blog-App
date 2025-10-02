"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import truncateText from "@/utils/trancateText";
import {
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import useDeletePost from "../useDeletePost";
import { useRouter } from "next/navigation";

// Create Post
export function CreatePost() {
  return (
    <Link
      href="/profile/posts/create"
      className="justify-self-end flex gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-medium text-white 
      transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد پست</span>{" "}
      <PlusIcon className="w-5" />
    </Link>
  );
}

// Delete Post
export function DeletePost({ post: { _id: id, title } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isDeleting, deletePost } = useDeletePost();
  return (
    <>
      <ButtonIcon variant="red" onClick={() => setOpen(true)}>
        <TrashIcon />
      </ButtonIcon>

      <Modal
        title={`حذف ${truncateText(title, 25)}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={truncateText(title, 25)}
          onClose={() => setOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deletePost(
              { id },
              {
                onSuccess: () => {
                  setOpen(false);
                  router.refresh("/profile/posts");
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

// Edit Post
export function UpdatePost({ id }) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon variant="edit">
        <PencilSquareIcon />
      </ButtonIcon>
    </Link>
  );
}
