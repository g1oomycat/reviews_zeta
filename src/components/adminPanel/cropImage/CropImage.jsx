import { useContext } from "react";
import classes from "./cropImage.module.scss";
import { TbPencilUp } from "react-icons/tb";
import { MIN_DIMENSION } from "../../../functions/allForCropImg";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const CropImage = observer(() => {
  const { statePopup } = useContext(Context);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        if (statePopup.isError) statePopup.setIsError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          statePopup.setIsError(
            "Фотография должна быть минимум 100 х 100 пикселей."
          );
          return statePopup.setSrcImg("");
        }
      });
      statePopup.setSrcImg(imageUrl);
    });
    statePopup.setIsOpen(true);
    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className={classes.block}>
        <div className={classes.image_wrapper}>
          <img src={statePopup.srcAvatar} alt="avatar" />
        </div>
        <div className={classes.change_ava}>
          <label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <TbPencilUp />
          </label>
        </div>
      </div>
      {!!statePopup.isError && (
        <div className={classes.error_modal}>{statePopup.isError}</div>
      )}
    </>
  );
});

export default CropImage;
