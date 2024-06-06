const studentName = document.getElementById('name')
const number = document.getElementById('idNumber')
const rollNo = document.getElementById('rollno')
const studentClass = document.getElementById('class')
const button = document.querySelector('.btn')
const form = document.querySelector('form')
const rightSection = document.querySelector(".right-section")


const registration = []
let editIndex = null;
showStudentDetails() 

function showStudentDetails(){
     registration.forEach((value,index)=>{
          const article = document.createElement('article')
          article.setAttribute("class","student-details")

          const pname = document.createElement('p')
          pname.setAttribute("class","name")
          pname.innerText = value.studentName;
          article.append(pname)

          const pid = document.createElement('p')
          pid.setAttribute("class","id")
          pid.innerText = value.number
          article.append(pid)

          const pClassName = document.createElement('p')
          pClassName.setAttribute("class","className")
          pClassName.innerText = value.studentClass
          article.append(pClassName)

          const proll = document.createElement('p')
          proll.setAttribute("class","roll")
          proll.innerText = value.rollNo
          article.append(proll)

          const resetButton = document.createElement("button")
          resetButton.setAttribute("class","btns")
          resetButton.innerText = "Edit"
          resetButton.addEventListener("click",()=>{
            const student = registration[index]
            studentName.value = student.studentName
            number.value = student.number;
            studentClass.value = student.studentClass;
            rollNo.value = student.rollNo;
            editIndex = index; // Set the index of the student being edited
          })

          article.append(resetButton)

          const deleteButton = document.createElement("button")
          deleteButton.setAttribute("class","btns")
          deleteButton.innerText = "Delete"
          
          deleteButton.addEventListener("click",()=>{
            removeDetails()
              registration.splice(index,1)
              localStorage.setItem("registered",JSON.stringify(registration))
              console.log(registration)
              showStudentDetails()
          })

          article.append(deleteButton)
          rightSection.append(article)
     
     })
}

function resetForm() {
    studentName.value = '';
    number.value = '';
    studentClass.value = '';
    rollNo.value = '';
    editIndex = null; // Reset editIndex
}

function removeDetails(){
    registration.forEach(()=>{
        const div = document.querySelector(".student-details")
        div.remove()
      
    })
}

form.addEventListener('submit',(e)=> {
    e.preventDefault()

    if (!studentName.value.trim()) {
        alert("Student name cannot be empty.");
        return;
    } else if (!number.value.trim()) {
        alert("student ID Number cannot be empty.");
        return;
    } else if (!rollNo.value.trim()) {
        alert("Roll Number cannot be empty.");
        return;
    } else if (!studentClass.value.trim()) {
        alert("Class cannot be empty.");
        return;
    }
9
  // Remove existing details before updating
    removeDetails()

     // Add new student
    if(editIndex === null){
        registration.push({
                studentName:studentName.value,
                number:number.value,
                studentClass:studentClass.value,    
                rollNo:rollNo.value,      
            })
    }else{
        // Update existing student
        registration[editIndex]={
            studentName:studentName.value,
            number:number.value,
            studentClass:studentClass.value,    
            rollNo:rollNo.value,  
        }

        editIndex = null;
    }
    localStorage.setItem("registered",JSON.stringify(registration))
    console.log(registration)
    showStudentDetails() 
    form.reset()   

})

