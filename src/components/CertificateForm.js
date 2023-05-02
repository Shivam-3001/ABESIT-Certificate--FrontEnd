import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import './style.css';
function CertificateForm() {
    const [certificateOptions, setCertificateOptions] = useState([
        // {
        //     label: 'JAVA',
        //     value: 'java'
        // },
        // {
        //     label: 'React',
        //     value: 'react'
        // }
    ]);
    const [showError, setShowError] = useState(false)
    const [selectedCertificate, setSelectedCertificate] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const rollNo = watch("rollNo");
    const name = watch("name");

    const onSubmit = async () => {
        try {
            const response = await axios.get(`/api/check-table?name=${name}&rollNo=${rollNo}`);
            setCertificateOptions(response.data);
            // if (condition) {
            //     setShowError(true)
            // }
        } catch (error) {
            console.error(error);

        }
    };
    const handleDropdown = (event) => {
        setSelectedCertificate(event.target.value)
    }

    const handleDownload = () => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ width: '100%' }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div style={{ width: '100%' }}>
                <label htmlFor="rollNo">Roll No</label>
                <input type="text" id="rollNo" {...register("rollNo", { required: true })} />
                {errors.rollNo && <span>This field is required</span>}
            </div>
            <button type="submit">Check</button>

            <div style={{ width: '100%' }}>
                <label htmlFor="certificateAvailable">Certificate Available</label>
                <select id="certificateAvailable"
                    {...register("certificateAvailable", { required: true })}
                    onChange={handleDropdown}
                    className={certificateOptions.length == 0 && "disabled"}
                >
                    <option value="">--Select--</option>
                    {certificateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

            </div>
            {showError && certificateOptions.length == 0 && <span>No certificate available for the given name and roll no</span>}
            <button type="button" onClick={handleDownload} className={selectedCertificate == '' && 'disabled'}>
                Download
            </button>


        </form>
    );
}

export default CertificateForm;
