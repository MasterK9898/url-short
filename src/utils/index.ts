export const uploadFile = (accept: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.accept = accept;
    input.type = "file";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      resolve(file);
    };

    input.click();
  });
};

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;

      if (typeof res === "string") {
        resolve(res);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.readAsText(file);
  });
};
