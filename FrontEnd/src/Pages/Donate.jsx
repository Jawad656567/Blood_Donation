import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Phone,
  MapPin,
  Calendar,
  HeartPulse,
  Droplet,
} from "lucide-react";


export default function BloodDonorForm() {


const [formData,setFormData] = useState({

fullName:"",
fatherName:"",
age:"",
phone:"",
gender:"",
bloodGroup:"",
address:"",
date:""

});


const [errors,setErrors] = useState({});





const handleChange = (e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});


setErrors({

...errors,

[e.target.name]:""

});


};






const validate = ()=>{


let newErrors={};




if(!formData.fullName.trim()){

newErrors.fullName="Full name is required";

}

else if(formData.fullName.length < 3){

newErrors.fullName="Name must contain 3 characters";

}





if(!formData.fatherName.trim()){

newErrors.fatherName="Father name is required";

}





if(!formData.age){

newErrors.age="Age is required";

}

else if(formData.age < 18){

newErrors.age="Age must be 18 or above";

}







if(!formData.phone){

newErrors.phone="Phone number is required";

}

else if(!/^[0-9]{11}$/.test(formData.phone)){

newErrors.phone="Enter valid 11 digit phone number";

}






if(!formData.gender){

newErrors.gender="Please select gender";

}





if(!formData.bloodGroup){

newErrors.bloodGroup="Please select blood group";

}





if(!formData.address.trim()){

newErrors.address="Address is required";

}





if(!formData.date){

newErrors.date="Donation date is required";

}




setErrors(newErrors);


return Object.keys(newErrors).length === 0;


};







const handleSubmit=(e)=>{

e.preventDefault();


if(validate()){


alert("Donor Registered Successfully");


console.log(formData);


}


};






return (

<div

className="
min-h-screen
bg-cover
bg-center
flex
items-center

justify-center
px-4
py-10
relative
"


style={{

backgroundImage:
"url('https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=1600&q=80')"

}}

>


<div className="
absolute
inset-0
bg-transparent

">
</div>





<motion.div


initial={{
opacity:0,
y:50
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.7
}}


className="

relative
z-10
w-full
backdrop-blur-lg
max-w-xl

bg-white/20

border
border-white/30

rounded-3xl

p-6
md:p-10

"

>





<div className="text-center mb-8">



<motion.div


animate={{
y:[0,-8,0]
}}


transition={{
repeat:Infinity,
duration:2
}}


className="

mx-auto
mb-4

w-16
h-16

rounded-full

bg-red-600

flex
items-center
justify-center

"

>


<Droplet

size={36}

fill="white"

className="text-white"

/>


</motion.div>





<h1

className="

text-3xl

md:text-4xl

font-bold

text-white

"

>

Become a Blood Donor

</h1>




<p

className="

text-blue-100

mt-2

"

>

Your small step can save a life

</p>




</div>





<form

onSubmit={handleSubmit}

className="space-y-5"

>

{/* Inputs Grid */}

<div className="
grid
md:grid-cols-2
gap-4
">


{/* Full Name */}

<div>

<label className="text-white text-sm">
Full Name
</label>

<div className="
mt-1
flex
items-center
bg-white/80
rounded-xl
border
border-white
px-3
">

<User
size={18}
className="text-red-600"
/>


<input

name="fullName"

value={formData.fullName}

onChange={handleChange}

type="text"

placeholder="Enter your full name"

className="
w-full
bg-transparent
outline-none
px-3
py-3
text-gray-800
"

/>

</div>


{
errors.fullName &&
<p className="text-red-300 text-xs mt-1">
{errors.fullName}
</p>
}


</div>






{/* Father Name */}

<div>

<label className="text-white text-sm">
Father Name
</label>


<div className="
mt-1
flex
items-center
bg-white/80
rounded-xl
border
border-white
px-3
">


<Users
size={18}
className="text-red-600"
/>


<input

name="fatherName"

value={formData.fatherName}

onChange={handleChange}

type="text"

placeholder="Enter father name"

className="
w-full
bg-transparent
outline-none
px-3
py-3
"

/>


</div>


{
errors.fatherName &&
<p className="text-red-300 text-xs mt-1">
{errors.fatherName}
</p>
}


</div>







{/* Age */}

<div>

<label className="text-white text-sm">
Age
</label>


<div className="
mt-1
flex
items-center
bg-white/80
rounded-xl
px-3
">


<HeartPulse
size={18}
className="text-red-600"
/>


<input

name="age"

value={formData.age}

onChange={handleChange}

type="number"

placeholder="Enter age"

className="
w-full
bg-transparent
outline-none
px-3
py-3
"

/>


</div>


{
errors.age &&
<p className="text-red-300 text-xs mt-1">
{errors.age}
</p>
}


</div>








{/* Phone */}

<div>

<label className="text-white text-sm">
Phone Number
</label>


<div className="
mt-1
flex
items-center
bg-white/80
rounded-xl
px-3
">


<Phone
size={18}
className="text-red-600"
/>



<input

name="phone"

value={formData.phone}

onChange={handleChange}

type="tel"

placeholder="03XX XXXXXXX"

className="
w-full
bg-transparent
outline-none
px-3
py-3
"

/>


</div>


{
errors.phone &&
<p className="text-red-300 text-xs mt-1">
{errors.phone}
</p>
}


</div>



</div>









{/* Gender */}

<div>

<label className="text-white text-sm">
Gender
</label>


<select

name="gender"

value={formData.gender}

onChange={handleChange}

className="
mt-1
w-full
bg-white/80
rounded-xl
px-4
py-3
outline-none
"


>


<option value="">
Select Gender
</option>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


</select>



{
errors.gender &&
<p className="text-red-300 text-xs mt-1">
{errors.gender}
</p>
}



</div>








{/* Blood Group */}


<div>


<label className="text-white text-sm">
Blood Group
</label>



<select


name="bloodGroup"


value={formData.bloodGroup}


onChange={handleChange}


className="

mt-1

w-full

bg-white/80

rounded-xl

px-4

py-3

outline-none

"


>


<option value="">
Select Blood Group
</option>


<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>O+</option>
<option>O-</option>
<option>AB+</option>
<option>AB-</option>


</select>



{
errors.bloodGroup &&
<p className="text-red-300 text-xs mt-1">
{errors.bloodGroup}
</p>
}



</div>








{/* Address */}


<div>


<label className="text-white text-sm">
Complete Address
</label>



<div className="
mt-1
flex
bg-white/80
rounded-xl
px-3
">


<MapPin

size={18}

className="
text-red-600
mt-3
"

/>



<textarea


name="address"


value={formData.address}


onChange={handleChange}


rows="3"


placeholder="Enter your address"


className="

w-full

bg-transparent

outline-none

px-3

py-3

"


/>



</div>



{
errors.address &&
<p className="text-red-300 text-xs mt-1">
{errors.address}
</p>
}



</div>








{/* Date */}


<div>


<label className="text-white text-sm">

Last Blood Donation Date

</label>



<div className="
mt-1
flex
items-center
bg-white/80
rounded-xl
px-3
">


<Calendar

size={18}

className="text-red-600"

/>



<input


name="date"


value={formData.date}


onChange={handleChange}


type="date"


className="

w-full

bg-transparent

px-3

py-3

outline-none

"


/>



</div>



{
errors.date &&
<p className="text-red-300 text-xs mt-1">
{errors.date}
</p>
}



</div>









{/* Submit Button */}


<motion.button


type="submit"


whileHover={{
scale:1.03
}}


whileTap={{
scale:.97
}}



className="

w-full

py-3

rounded-xl

text-white

font-semibold

bg-gradient-to-r

from-red-500

via-red-600

to-red-800

hover:from-red-600

hover:to-red-900

transition-all

duration-300

"


>


Register as Donor


</motion.button>






<p

className="

text-center

text-blue-100

text-sm

"

>

Join thousands of donors saving lives

</p>




</form>


</motion.div>


</div>


);

}