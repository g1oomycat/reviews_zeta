import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";

export const InpTextField = ({ name, label, variant, validation, control }) => (
  <div>
    <Controller
      name={name}
      rules={validation}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          variant={variant}
          helperText={error && error?.message}
          error={!!error}
        />
      )}
      control={control}
    />
  </div>
);
export const InpTextFieldWithMask = ({
  name,
  label,
  variant,
  validation,
  control,
  mask,
}) => (
  <div>
    <Controller
      name={name}
      rules={validation}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <MaskedInput
          {...field}
          mask={mask}
          render={(ref, props) => (
            <TextField
              {...props}
              inputRef={ref}
              label={label}
              fullWidth
              variant={variant}
              helperText={error && error.message}
              error={!!error}
            />
          )}
        />
      )}
      control={control}
    />
  </div>
);
export const InpSelect = ({
  name,
  label,
  variant,
  validation,
  control,
  list,
  valueKey,
  labelKey,
}) => {
  return (
    <div>
      <FormControl fullWidth variant={variant}>
        <InputLabel id={`label-${name}`}>{label}</InputLabel>
        <Controller
          name={name}
          defaultValue={""}
          rules={validation}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                {...field}
                labelId={`label-${name}`}
                label={label}
                error={!!error}
              >
                {list.map((item, index) => {
                  if (typeof item === "object") {
                    return (
                      <MenuItem key={index} value={item[valueKey]}>
                        {item[labelKey]}
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
              <FormHelperText error={!!error}>
                {error ? error.message : ""}
              </FormHelperText>
            </>
          )}
          control={control}
        />
      </FormControl>
    </div>
  );
};
export const InpPassword = ({ name, label, variant, validation, control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Controller
        name={name}
        rules={validation}
        defaultValue={""}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            fullWidth
            variant={variant}
            type={showPassword ? "text" : "password"}
            helperText={error && error?.message}
            error={!!error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        control={control}
      />
    </div>
  );
};
