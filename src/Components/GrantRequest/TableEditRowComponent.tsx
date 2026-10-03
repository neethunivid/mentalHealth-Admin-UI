import { TableRow, TableCell, Grid } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

import InputEditComponent from './InputEditComponent';
const TableEditRowComponent = ({ item, date,
    handleCheckboxChange, handleEditClick, textBoxEnabled, handleSubmitData }: any) => {
    const {
        register,
        watch,
        handleSubmit,
        control,
        setError,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = (rowId: any) => {
        let formData = getValues();
        handleSubmitData(formData, rowId);

    }
    return (
        <>
            <TableRow>
                <TableCell className=' Table-root-col1 cell-padding Table-root-border-right-bottom  '>
                    <input type="checkbox" value={item.id} onChange={handleCheckboxChange} /></TableCell>

                <TableCell className=' Table-root-col0 cell-padding  Table-root-border-right-bottom  '>
                    {textBoxEnabled == false ?
                        <button className="edit-grid-root-input" onClick={() => handleEditClick(item.id)} >
                            編集
                        </button> : <button className="edit-grid-root-input" onClick={() => onSubmit(item.id)} >
                            保存
                        </button>}
                </TableCell>
                <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  ' >
                    <InputEditComponent control={control} defaultValue={item.id} name="id" /></TableCell>
                {item.newCont ? <TableCell className='Table-root-col3 cell-padding  Table-root-border-right-bottom  '>
                    <InputEditComponent control={control} defaultValue={item.newCont} name="newCont" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className='Table-root-col3 cell-padding  Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="newCont" textBoxEnabled={textBoxEnabled} /></TableCell>}
                {item.classification ?
                    <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.classification} name="classification" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.classification} name="classification" textBoxEnabled={textBoxEnabled} /></TableCell>}

                {item.institution ?
                    <TableCell className='Table-root-col5 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.institution} name="institution" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className='Table-root-col5 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.institution} name="institution" textBoxEnabled={textBoxEnabled} />
                    </TableCell>}
                {item.age ?
                    <TableCell className='Table-root-col6 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.age} name="age" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className='Table-root-col6 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.age} name="age" textBoxEnabled={textBoxEnabled} /></TableCell>}

                <TableCell className='Table-root-col7 cell-padding Table-root-border-right-bottom '>
                    {item.email2 ? item.email2 : item.repEmail}
                </TableCell>

                {item.recomdPernInst ?
                    <TableCell className='Table-root-col8 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.recomdPernInst} name="recomdPernInst" textBoxEnabled={textBoxEnabled} /></TableCell> :

                    <TableCell className='Table-root-col8 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={""} name="recomdPernInst" textBoxEnabled={textBoxEnabled} /></TableCell>}
                {item.researchName ?
                    <TableCell className='Table-root-col9 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.researchName} name="researchName" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className='Table-root-col9 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={""} name="researchName" textBoxEnabled={textBoxEnabled} /></TableCell>}

                <TableCell className='Table-root-col10 cell-padding Table-root-border-right-bottom '>
                    {item.expTotal}</TableCell>


                <TableCell className='Table-root-col11 cell-padding  Table-root-border-right-bottom '>
                    {item.subTotal}</TableCell>


            </TableRow>
            <TableRow>

                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>
                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>
                {date ? <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                    <InputEditComponent control={control} defaultValue={date} name="date" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="date" textBoxEnabled={textBoxEnabled} /></TableCell>}
                <TableCell className='Table-root-col3 cell-padding  Table-root-border-right-bottom  '></TableCell>
                <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '></TableCell>
                {item.dept ? <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                    <InputEditComponent control={control} defaultValue={item.dept} name="dept" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="dept" textBoxEnabled={textBoxEnabled} /></TableCell>}

                <TableCell className='Table-root-col6 cell-padding Table-root-border-right-bottom '>{ }</TableCell>
                <TableCell className='Table-root-col7 cell-padding Table-root-border-right-bottom '>{ }</TableCell>
                {item.recomdPernJob ? <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                    <InputEditComponent control={control} defaultValue={item.recomdPernJob} name="recomdPernJob" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="recomdPernJob" textBoxEnabled={textBoxEnabled} /></TableCell>}

                <TableCell className='Table-root-col9 cell-padding Table-root-border-right-bottom '>{ }</TableCell>
                <TableCell className='Table-root-col10 cell-padding Table-root-border-right-bottom '>{ }</TableCell>
                <TableCell className='Table-root-col11 cell-padding  Table-root-border-right-bottom '>{ }</TableCell>
            </TableRow>

            <TableRow>

                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>
                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>
                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>
                <TableCell className='Table-root-col3 cell-padding  Table-root-border-right-bottom  '></TableCell>

                {item.remark ?
                    <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.remark} name="remark" textBoxEnabled={textBoxEnabled} />
                    </TableCell> :

                    <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '>
                        <InputEditComponent control={control} defaultValue={item.remark} name="remark" textBoxEnabled={textBoxEnabled} />
                    </TableCell>}
                {item.fullname || item.representative ? <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '>
                    <InputEditComponent control={control} defaultValue={item.fullname ? item.fullname : item.representative} name="representative" textBoxEnabled={textBoxEnabled} />
                </TableCell> :
                    <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="representative" textBoxEnabled={textBoxEnabled} />
                    </TableCell>}
                <TableCell className='Table-root-col6 cell-padding Table-root-border-right-bottom '></TableCell>
                <TableCell className='Table-root-col7 cell-padding Table-root-border-right-bottom '></TableCell>

                {item.recomdPernFullname ?
                    <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={item.recomdPernFullname} name="recomdPernFullname" textBoxEnabled={textBoxEnabled} /></TableCell> :
                    <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '>
                        <InputEditComponent control={control} defaultValue={""} name="recomdPernFullname" textBoxEnabled={textBoxEnabled} /></TableCell>}
                <TableCell className='Table-root-col9 cell-padding Table-root-border-right-bottom '></TableCell>
                <TableCell className='Table-root-col10 cell-padding Table-root-border-right-bottom '></TableCell>
                <TableCell className='Table-root-col11 cell-padding  Table-root-border-right-bottom '></TableCell>
            </TableRow>

        </>
    );
}

export default TableEditRowComponent;
