import React, {useState} from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './RegistrationForm.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from '../../components/Button';

// const RegistrationForm = ({ submitForm }) => {
const RegistrationForm = (props) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    props.submitForm,
    validate,
    props.uploadSingle
  );

  const [contributors, setContributors] = useState([]);


  const prevIsValid = () => {
    if (contributors.length === 0) {
      return true;
    }

    const someEmpty = contributors.some(
      (item) => item.wallet_address === "" || item.name === "" || item.royalty_perc === ""
    );

    if (someEmpty) {
        contributors.map((item, index) => {
        const allPrev = [...contributors];

        if (contributors[index].Name === "") {
        }

        if (contributors[index].wallet_address === "") {
        }

        if (contributors[index].royalty_perc === "") {
        }
        setContributors(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      Name: "",
      royalty_perc: "",
      wallet_address: "",

    };

    if (prevIsValid()) {
      setContributors((prev) => [...prev, inputState]);
    }
  };


  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setContributors((prev) => prev.filter((item) => item !== prev[index]));
  };

  return (

        <form onSubmit= {(event) => handleSubmit(event, contributors)} className='form' noValidate>
        <h1 className='box-header'>
          Music Copyright Registration
        </h1>
            <div className='form-inputs'>
            <label className='form-label'>Author</label>
            <input
                className='form-input'
                type='text'
                name='author_name'
                placeholder='Enter your name'
                value={values.author_name}
                onChange= {(event) => handleChange(event, -1, setContributors)}
                required
            />
            </div>

        <div className='form-inputs'>
          <label className='form-label'>Title</label>
          <input
            className='form-input'
            type='text'
            name='title'
            placeholder='Enter the title of this work'
            value={values.title}
            onChange= {(event) => handleChange(event, -1, setContributors)}
            required
          />
        </div>

        <div className='form-inputs'>
          <label className='form-label'>Description</label>
          <input
            className='form-input'
            type='text'
            name='description'
            placeholder='Enter the description'
            value={values.description}
            onChange={(event) => handleChange(event, -1, setContributors)}
            required
          />
        </div>

        <div className='form-inputs'>
            <label className='form-label' for="files">Track</label>
        </div>
        <div className='form-inputs'>
            <input type='file' accept=".mp3" onChange={props.captureTrack} />
        </div>

        <div className='form-inputs'>
            <label className='form-label' for="files">Artwork</label>
        </div>
        <div className='form-inputs'>
            <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={props.captureArtwork} />
        </div>

        <div className='form-inputs'>
            <label className='form-label'>Contributors</label>
                {contributors.map((item, index) => (
                <Row className="Row" key={`item-${index}`}>
                    <input
                        type="text"
                        className="form-input"
                        name="Name"
                        placeholder="Name"
                        value={item.Name}
                        onChange={(event) => handleChange(event, index, setContributors)}
                    />
                    <input
                        type="text"
                        className="form-input"
                        name="royalty_perc"
                        placeholder="royalty_perc"
                        value={item.royalty_perc}
                        onChange={(event) => handleChange(event, index, setContributors)}
                    />
                    <input
                        type="text"
                        className="form-input"
                        name="wallet_address"
                        placeholder="wallet_address"
                        value={item.wallet_address}
                        onChange={(event) => handleChange(event, index, setContributors)}
                    />
                    <Button buttonStyle='btn--outline'
                    onClick={(e) => handleRemoveField(e, index, setContributors)}
                    >
                    x
                    </Button>
                </Row>
                ))}
        </div>
        <div className='form-inputs'>
                <Button buttonStyle="btn--outline" onClick={handleAddLink}>
                Add contributor
                </Button>
        </div>
        <button className='form-input-btn' type='submit'>
          Copyright your work
        </button>
      </form>
   );
 };

export default RegistrationForm;