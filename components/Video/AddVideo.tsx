import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { VideoUpload } from "@/types";
import { VideoModalProps } from "@/types/props/Modal/VideoModalProps";
import Image from "next/image";
import { uploadVideo } from "@/api/video/upload";
import { JwtTokenManager } from "@/utils/jwtManager";
import showToast from "@/utils/toast";
import { apiRefresh } from "@/api/auth/refresh";

const resolver: Resolver<VideoUpload> = async (values) => {
  const MAX_VIDEO_SIZE_MB = 100;
  const maxVideoSizeBytes = MAX_VIDEO_SIZE_MB * 1024 * 1024;

  const isValid =
    values.title &&
    values.description &&
    values.thumbnailFile &&
    values.videoFile.length > 0 &&
    values.videoFile[0].size <= maxVideoSizeBytes;

  return {
    values: isValid ? values : {},
    errors: {
      ...(isValid || values.videoFile.length
        ? {}
        : {
            videoFile: {
              type: "required",
              message: "Please choose a video file",
            },
          }),
      ...(isValid || values.title
        ? {}
        : {
            title: {
              type: "required",
              message: "Please enter a video title",
            },
          }),
      ...(isValid || values.thumbnailFile
        ? {}
        : {
            thumbnailFile: {
              type: "required",
              message: "Please choose a video thumbnail",
            },
          }),
      ...(isValid || values.description
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

const AddVideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [filePreviews, setFilePreviews] = useState<{
    video: string | null;
    thumbnail: string | null;
  }>({
    video: null,
    thumbnail: null,
  });
  const tokenManager = new JwtTokenManager();
  const token = tokenManager.getToken();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<VideoUpload>({ resolver });
  const closeModal = () => {
    reset();
    onClose();
    setFilePreviews({
      video: null,
      thumbnail: null,
    });
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "video" | "thumbnail"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilePreviews((prevPreviews) => ({
        ...prevPreviews,
        [fileType]: URL.createObjectURL(file),
      }));
    }
  };

  const handleApiResult = async (result: {
    statusCode: any;
    message: string;
  }) => {
    switch (result.statusCode) {
      case 400:
        //setError("channelName", { type: "server" });
        showToast(result.message, "warning");
        break;
      case 201:
        showToast(result.message, "success");
        break;
      case 500:
        showToast(result.message, "error");
        break;
        case 401:
           apiRefresh();
                showToast(
                  "An error has occurred, please try again later. ",
                  "error"
                );
          break;
      default:
        break;
    }
  };
  const onSubmit: SubmitHandler<VideoUpload> = async (data) => {
    clearErrors();
    if (token) {
      const result = await uploadVideo(data, token);
      await handleApiResult(result);
    } else {
      showToast("An error has occurred, please try again later. ", "error");
      const refreshResult = await apiRefresh();

      if (refreshResult.statusCode === 200) {
        if (token) {
          const result = await uploadVideo(data, token);
          await handleApiResult(result);
        } else {
          showToast("An error has occurred, please try again later. ", "error");
        }
      }
    }

    // closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      maxWidth="md"
      className="bg-stone-50/75 "
    >
      <DialogContent className="bg-neutral-950/75">
        <div className="relative p-4  rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            X
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="videoTitle"
                className="block text-gray-800 dark:text-white"
              >
                Video Title:
              </label>
              <input
                type="text"
                id="videoTitle"
                {...register("title")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoDescription"
                className="block text-gray-800 dark:text-white"
              >
                Description:
              </label>
              <textarea
                id="videoDescription"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Choose Video
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                {...register("videoFile", {
                  onChange: (e) => handleFileChange(e, "video"),
                })}
                accept="video/mp4,video/x-m4v,video/*"
              />
              {filePreviews.video && (
                <video width="320" height="240" controls>
                  <source src={filePreviews.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {errors.videoFile && (
                <p className="text-red-500 text-sm">
                  {errors.videoFile.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoThumbnail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Thumbnail:
              </label>
              <input
                type="file"
                id="thumbnailFile"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                {...register("thumbnailFile", {
                  onChange: (e) => handleFileChange(e, "thumbnail"),
                })}
                accept="image/jpeg, image/png"
              />
              {filePreviews.thumbnail && (
                <Image
                  src={filePreviews.thumbnail}
                  alt="Thumbnail Preview"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                  width={320}
                  height={240}
                />
              )}
              {errors.thumbnailFile && (
                <p className="text-red-500 text-sm">
                  {errors.thumbnailFile.message}
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
