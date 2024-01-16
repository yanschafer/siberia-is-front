import PrintUtil from "@/utils/localization/print.util";

export default class ApiErrorDto {
  constructor(
    public httpStatusCode: number,
    public httpStatusText: string,
    public data: string | null,
  ) {}

  public showServerErrorToast(toast, nextTick) {
    const errorMessage = String(this.data);
    const errorDetail = `${PrintUtil.localize("somethingWrong", "default")}
    <p style="font-weight: 600; text-decoration: underline; cursor: pointer;">${errorMessage}</p>`;
    toast.add({
      severity: "error",
      summary: PrintUtil.localize("errorOccurred", "default"),
      detail: errorDetail,
      life: 10000,
    });

    nextTick(() => {
      const toastElement = document.querySelector(".p-toast-detail");
      if (toastElement) {
        toastElement.innerHTML = errorDetail;

        const errorMessageElement = toastElement.querySelector("p");
        errorMessageElement.addEventListener("click", () => {
          navigator.clipboard.writeText(errorMessage);
          toast.add({
            severity: "success",
            summary: PrintUtil.localize("errorMessageCopiedToClipboard", "default"),
            life: 2000,
          });
        });
      }
    });
  }
}
