import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const getRequestUrl = process.env.NEXT_PUBLIC_GET_URL || '';
const postRequestUrl = process.env.NEXT_PUBLIC_POST_ENDPOINT || '';

const Form = ()=> {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [random, setRandom] = useState('');
    const [randomField, setRandomField] = useState('');
    const [gender, setGender] = useState({
        "fieldName":"",
        "type":'',
        "value":'',
        "options":["male","female","other"]
    });
    const [age, setAge] = useState<number>();
    const [testimonial, setTestimonial] = useState(); 
    const [response, setResponse] = useState<string>();


    const getFormData = async() => {
        const data = await fetch(getRequestUrl).then((res) => res.json())
        for(let i:any = 0; i<=data.data?.length-1; i++){
            if(data.data[i]?.fieldName==="firstName"){
                setFirstName(data.data[i]?.value)
            }
            if(data.data[i]?.fieldName==="lastName"){
                setLastName(data.data[i]?.value)
            }
            if(data.data[i]?.fieldName==="emailAddress"){
                setEmail(data.data[i]?.value)
            }
            if(data.data[i]?.fieldName==="gender"){
                setGender(data.data[i])
            }
            if(data.data[i]?.fieldName==="age"){
                setAge(data.data[i]?.value)
            }
            if(data.data[i]?.fieldName==="testimonial"){
                setTestimonial(data.data[i]?.value)
            }
            if(i===3){
                setRandom(data.data[i]?.value)
                setRandomField(data.data[i]?.fieldName)
            }
        }
        
    }

    useEffect(() => {
        getFormData();
    }, [])
    const handleGenderField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender({
            "fieldName":"",
            "type":'',
            "value":event.target.value,
            "options":["male","female","other"]
        });
      };
    
    const handleFirstName = (event:any) => {
        setFirstName(event.target.value);
    }

    const handleLastName = (event:any) => {
        setLastName(event.target.value);
    }
    const handleEmail = (event:any) => {
        setEmail(event.target.value);
    }
    const handleRandom = (event:any) => {
        setRandom(event.target.value);
    }
    const handleAge = (event:any) => {
        setAge(event.target.value);
    }
    const handleTestimonial = (event:any) => {
        setTestimonial(event.target.value);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()    
        const form = event.target as HTMLFormElement        
        const data = {
          firstName: form.firstname.value as string,
          lastName: form.lastname.value as string,
          emailAddress: form.email.value as string,
          [randomField] : form.random.value as string,
          [gender?.value?"gender":'']:gender?.value as string,
          [age!==undefined?"age":""]: form?.age?.value as number,
          [testimonial!==undefined?"testimonial":""]: form?.testimonial?.value as string,
        }
    
        const response = await fetch(postRequestUrl, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const result = await response.text()
        setResponse(result);
      }      

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                style={{marginTop:"1rem"}}
                id="firstname"
                label="First Name"
                variant="outlined"
                type="text"
                value={firstName}
                onChange = {handleFirstName}
                placeholder='firstName'
                fullWidth={true}
                />
                <TextField
                style={{marginTop:"1rem"}}
                id="lastname"
                label="Last Name"
                variant="outlined"
                type="text"
                value={lastName}
                onChange = {handleLastName}
                placeholder='lastName'
                fullWidth={true}
                />
                <TextField
                style={{marginTop:"1rem"}}
                id="email"
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange = {handleEmail}
                placeholder='Email Address'
                fullWidth={true}
                />
                <TextField
                style={{marginTop:"1rem"}}
                id="random"
                label={randomField}
                variant="outlined"
                type="text"
                value={random}
                onChange = {handleRandom}
                placeholder={randomField}
                fullWidth={true}
                />
                {gender?.value?
                    <TextField
                    style={{marginTop:"1rem"}}
                    id="gender"
                    label="Gender"
                    variant="outlined"
                    select
                    value={gender?.value}
                    onChange={handleGenderField}
                    placeholder='gender'
                    fullWidth={true}
                    >
                        {gender?.options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                :null}
                {age!==undefined?
                    <TextField
                    style={{marginTop:"1rem"}}
                    id="age"
                    label="Age"
                    variant="outlined"
                    type="number"
                    value={age}
                    onChange = {handleAge}
                    placeholder='age'
                    fullWidth={true}
                    />
                :null}
                {testimonial!==undefined?
                    <TextField
                    style={{marginTop:"1rem"}}
                    id="testimonial"
                    label="Testimonial"
                    variant="outlined"
                    type="text"
                    value={testimonial}
                    onChange = {handleTestimonial}
                    placeholder='testimonial'
                    fullWidth={true}
                    multiline
                    minRows={6}
                    />
                :null}
                <Box style={{display: "flex",marginTop: "16px",justifyContent: "center"}}>
                    <Button variant="contained" type='submit' color='primary'>Submit</Button>
                </Box>
            </form>
            {response?
                <Box style={{marginTop:"48px", marginBottom:"30px"}}>
                    <Typography variant="h6" paragraph>
                        Response
                    </Typography>
                    <code>
                        {response}
                    </code>
                </Box>
            :null}
        </div>
    )
}
export default Form;