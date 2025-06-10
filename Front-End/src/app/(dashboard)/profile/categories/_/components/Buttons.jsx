"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useDeleteCategory from "../useDeleteCategory";
import CreateCategoryForm from "../../create/_/CreateCategoryForm";

// Create Category
export function CreateCategory() {
  return (
    <Link
      href="/profile/categories/create"
      className="justify-self-end flex gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-medium text-white 
      transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد دسته‌بندی</span>
      <PlusIcon className="w-5" />
    </Link>
  );
}

// Delete Category
export function DeleteCategory({ category: { _id: id, title } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isDeleting, deleteCategory } = useDeleteCategory();

  return (
    <>
      <ButtonIcon variant="red" onClick={() => setOpen(true)}>
        <TrashIcon />
      </ButtonIcon>

      <Modal
        title={<span>حذف دسته بندی</span>}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={title}
          onClose={() => setOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deleteCategory(
              { id },
              {
                onSuccess: () => {
                  setOpen(false);
                  router.refresh("/profile/categories");
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

// Edit Category
export function UpdateCategory({ category }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonIcon variant="edit" onClick={() => setOpen(true)}>
        <PencilSquareIcon />
      </ButtonIcon>

      <Modal
        title={
          <span>
            ویرایش دسته‌بندی:{" "}
            <span className="font-bold text-primary-900">{category.title}</span>
          </span>
        }
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateCategoryForm
          categoryToEdit={category}
          onCloseModal={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
