import React, { useEffect, useState } from "react";
import {
  AvatarConfigProps,
  DEFAULT_AVATAR_CONFIG,
  HAIR_STYLE_OPTIONS,
  HAT_STYLE_OPTIONS,
  EYE_STYLE_OPTIONS,
  GLASSES_STYLE_OPTIONS,
  NOSE_STYLE_OPTIONS,
  MOUTH_STYLE_OPTIONS,
  SHIRT_STYLE_OPTIONS,
} from "./avatarConfig";
import Avatar, { genConfig } from "react-nice-avatar";
import { AvatarControlGroup, AvatarPreview } from "./elements";
import { PrimaryButton } from "../Buttons/PrimaryButton";

interface AvatarCustomizerProps {
  initialConfig?: AvatarConfigProps;
  onSave: (config: AvatarConfigProps) => void;
}

/* Reference: https://github.com/dapi-labs/react-nice-avatar */

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  initialConfig = DEFAULT_AVATAR_CONFIG,
  onSave,
}) => {
  const [config, setConfig] = useState<AvatarConfigProps>(initialConfig);
  const [generatedConfig, setX] = useState(genConfig(initialConfig));

  const handleChange = (key: keyof AvatarConfigProps, value: any) => {
    setConfig((prev) => {
      const newConfig = {
        ...prev,
        [key]: value,
      };
      setX(genConfig(newConfig));
      return newConfig;
    });
  };

  useEffect(() => {
    setX(genConfig(config));
  }, [config]);

  return (
    <>
      <div className="avatar-customizer">
        <AvatarPreview>
          <Avatar
            style={{ width: "8rem", height: "8rem" }}
            {...generatedConfig}
          />
          <div
            className={`avatar ${config.shape}`}
            style={{
              backgroundColor: config.bgColor,
              backgroundImage: config.isGradient
                ? `linear-gradient(45deg, ${config.bgColor}, #FFFFFF)`
                : undefined,
            }}
          />
        </AvatarPreview>

        <div className="customization-controls">
          {/* <AvatarControlGroup>
            <label>Background Shape </label>
            <select
              value={config.shape}
              onChange={(e) => handleChange("shape", e.target.value)}
            >
              {SHAPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup> */}

          {/* <div className="control-group">
            <label>Sex</label>
            <select
              value={config.sex}
              onChange={(e) => handleChange("sex", e.target.value)}
            >
              {SEX_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div> */}
          <AvatarControlGroup>
            <label>Hair Style </label>
            <select
              value={config.hairStyle}
              onChange={(e) => handleChange("hairStyle", e.target.value)}
            >
              {HAIR_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>

          <AvatarControlGroup>
            <label>Hat Style Options </label>
            <select
              style={{ width: "100px" }}
              value={config.hatStyle}
              onChange={(e) => handleChange("hatStyle", e.target.value)}
            >
              {HAT_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>
          <AvatarControlGroup>
            <label>Eye Style Options </label>
            <select
              value={config.eyeStyle}
              onChange={(e) => handleChange("eyeStyle", e.target.value)}
            >
              {EYE_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>
          <AvatarControlGroup>
            <label>Glass Style Options </label>
            <select
              value={config.glassesStyle}
              onChange={(e) => handleChange("glassesStyle", e.target.value)}
            >
              {GLASSES_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>
          <AvatarControlGroup>
            <label>Nose Style Options </label>
            <select
              value={config.noseStyle}
              onChange={(e) => handleChange("noseStyle", e.target.value)}
            >
              {NOSE_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>
          <AvatarControlGroup>
            <label>Mouth Style Options </label>
            <select
              value={config.mouthStyle}
              onChange={(e) => handleChange("mouthStyle", e.target.value)}
            >
              {MOUTH_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>
          <AvatarControlGroup>
            <label>Shirt Style Options </label>
            <select
              value={config.shirtStyle}
              onChange={(e) => handleChange("shirtStyle", e.target.value)}
            >
              {SHIRT_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AvatarControlGroup>

          {/* Add similar controls for other options */}

          <div className="color-controls">
            <h4 style={{ marginBottom: "5px" }}>Color Options</h4>
            <AvatarControlGroup>
              <label>Background Color </label>
              <input
                type="color"
                value={config.bgColor}
                onChange={(e) => handleChange("bgColor", e.target.value)}
              />
            </AvatarControlGroup>
            <AvatarControlGroup>
              <label>Face Color </label>
              <input
                type="color"
                value={config.faceColor}
                onChange={(e) => handleChange("faceColor", e.target.value)}
              />
            </AvatarControlGroup>
            <AvatarControlGroup>
              <label>Hair Color </label>
              <input
                type="color"
                value={config.hairColor}
                onChange={(e) => handleChange("hairColor", e.target.value)}
              />
            </AvatarControlGroup>

            <AvatarControlGroup>
              <label>Hat Color </label>
              <input
                type="color"
                value={config.hatColor}
                onChange={(e) => handleChange("hatColor", e.target.value)}
              />
            </AvatarControlGroup>

            <AvatarControlGroup>
              <label>Shirt Color </label>
              <input
                type="color"
                value={config.shirtColor}
                onChange={(e) => handleChange("shirtColor", e.target.value)}
              />
            </AvatarControlGroup>
          </div>

          <PrimaryButton onClick={() => onSave(config)}>
            Save Avatar
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default AvatarCustomizer;
