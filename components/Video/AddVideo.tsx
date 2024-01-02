// Importez les bibliothèques nécessaires
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

// Interface pour les données du formulaire
interface VideoFormData {
  title: string;
  description: string;
  thumbnailFile: FileList;
  videoFile: FileList;
}

// Propriétés du composant
interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const resolver: Resolver<VideoFormData> = async (values) => {
  const MAX_VIDEO_SIZE_MB = 100;
  const maxVideoSizeBytes = MAX_VIDEO_SIZE_MB * 1024 * 1024;
  return {
    values:
      values.title &&
      values.description &&
      values.thumbnailFile &&
      values.videoFile &&
      values.videoFile[0]?.size <= maxVideoSizeBytes
        ? values
        : {},
    errors: {
      ...(values.videoFile
        ? {}
        : {
            videoFile: {
              type: "required",
              message: "Please choose a video file",
            },
          }),
      ...(values.title
        ? {}
        : {
            title: {
              type: "required",
              message: "Please enter a video title",
            },
          }),
      ...(values.thumbnailFile
        ? {}
        : {
            thumbnailFile: {
              type: "required",
              message: "Please choose a video thumbnail",
            },
          }),
      ...(values.description
        ? {}
        : {
            description: {
              type: "required",
              message: "Please enter a video description",
            },
          }),
    },
  };
};

const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoFormData>({ resolver });

  const onSubmit: SubmitHandler<VideoFormData> = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      className="bg-stone-50/75 "
    >
      <DialogContent >
        <div className="relative p-4 bg-slate-950 shadow-md rounded-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            X
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="videoFile"
                className="block text-gray-800 dark:text-white"
              >
                Choose Video File:
              </label>
              <input
                type="file"
                id="videoFile"
                accept="video/mp4,video/x-m4v,video/*"
                {...register("videoFile")}
              />
              {errors.videoFile && (
                <p className="text-red-500 text-sm">
                  {errors.videoFile.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoTitle"
                className="block text-gray-800 dark:text-white"
              >
                Video Title:
              </label>
              <input type="text" id="videoTitle" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoThumbnail"
                className="block text-gray-800 dark:text-white"
              >
                Choose Video Thumbnail:
              </label>
              <input
                type="file"
                id="thumbnailFile"
                {...register("thumbnailFile")}
              />
              {errors.thumbnailFile && (
                <p className="text-red-500 text-sm">
                  {errors.thumbnailFile.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoDescription"
                className="block text-gray-800 dark:text-white"
              >
                Video Description:
              </label>
              <textarea id="videoDescription" {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Upload Video
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVideoModal;
