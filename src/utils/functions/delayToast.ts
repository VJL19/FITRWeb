import { showFailedToast, showSuccessToast } from "src/components/showToast";

const delayShowToast = async (
  type: string,
  message: string | undefined,
  containerId: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (type === "success") {
    showSuccessToast(message, containerId);
  } else {
    showFailedToast(message, containerId);
  }
};

export default delayShowToast;
