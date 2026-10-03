import { Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

interface LayoutProps {
  control: any;
  name: any;
  defaultValue: any;
}

const RegSelectBox = ({ control, name, defaultValue }: LayoutProps) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== value));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  return (
    <div>
      <Grid container item xs={12}>
        <Grid item xs={4} className="content-row">
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="checkbox"
                  value="1"
                //   checked={selectedCheckboxes==1}
                  onChange={handleCheckboxChange}
                />
              </>
            )}
          />
          <label className="verdana">A. 参加中</label>
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="checkbox"
                  value="2"
                  checked={selectedCheckboxes.includes("2")}
                  onChange={handleCheckboxChange}
                />
              </>
            )}
          />
          <label className="verdana">B. 利用中止</label>
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="checkbox"
                  value="3"
                  checked={selectedCheckboxes.includes("3")}
                  onChange={handleCheckboxChange}
                />
              </>
            )}
          />
          <label className="verdana">D. 退会</label>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegSelectBox;
