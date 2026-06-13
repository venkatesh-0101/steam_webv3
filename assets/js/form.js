/* =====================================
   YANTROMITRA
   FORMS.JS PART 1
===================================== */

document.addEventListener(
   "DOMContentLoaded",
   () => {

      initializeSchoolForm();

      initializeGeneralForm();

      initializeCareerForm();

   }
);



/* =====================================
   CONFIG
===================================== */

const GOOGLE_SCRIPT_URL =
   "https://script.google.com/macros/s/AKfycbwVf4h2fzNVMno0eiRmGZhLLj4viuugtzvb5muMJwco6nXTGQeXuRn4gnAAi-TxsDTR/exec";

/* =====================================
   HELPER
===================================== */

function showMessage(
   elementId,
   message,
   type = "success"
) {

   const element =
      document.getElementById(
         elementId
      );

   if (!element) return;

   element.innerHTML = message;

   element.className =
      type === "success"
         ? "alert alert-success"
         : "alert alert-error";

   element.classList.remove(
      "hidden"
   );

   setTimeout(() => {

      element.classList.add(
         "hidden"
      );

   }, 5000);

}
/* =====================================
   EMAIL VALIDATION
===================================== */

function isValidEmail(email) {

   const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   return regex.test(email);

}

/* =====================================
   PHONE VALIDATION
===================================== */

function isValidPhone(phone) {

   const regex =
      /^[0-9]{10}$/;

   return regex.test(phone);

}

/* =====================================
   REQUIRED CHECK
===================================== */

function isEmpty(value) {

   return !value ||
      value.trim() === "";

}

/* =====================================
   FORM LOADING
===================================== */

function setButtonLoading(
   button,
   loading
) {

   if (!button) return;

   if (loading) {

      button.dataset.originalText =
         button.innerHTML;

      button.disabled = true;

      button.innerHTML =
         "Please Wait...";

   } else {

      button.disabled = false;

      button.innerHTML =
         button.dataset.originalText;

   }

}

/* =====================================
SUBMIT TO GOOGLE SHEETS
===================================== */

async function submitToGoogleSheet(payload) {

  await fetch(
    GOOGLE_SCRIPT_URL,
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload)
    }
  );

  return {
    status: "success"
  };
}

const text =
await response.text();

try {

```
  return JSON.parse(text);
```

} catch {

```
  return {
     status: "success",
     response: text
  };
```

}



/* =====================================
   SCHOOL DEMO FORM
===================================== */

function initializeSchoolForm() {

   const form =
      document.getElementById(
         "schoolDemoForm"
      );

   if (!form) return;

   form.addEventListener(
      "submit",
      async function (event) {

         event.preventDefault();

         const submitButton =
            form.querySelector(
               'button[type="submit"]'
            );

         const formData =
            new FormData(form);

         const email =
            formData.get("email");

         const mobile =
            formData.get("mobile");

         if (
            !isValidEmail(email)
         ) {

            showMessage(
               "schoolSuccess",
               "Please enter a valid email.",
               "error"
            );

            return;

         }

         if (
            !isValidPhone(mobile)
         ) {

            showMessage(
               "schoolSuccess",
               "Please enter a valid mobile number.",
               "error"
            );

            return;

         }

         const forclass =
            formData.get("forclass");

         const services =
            [];

         document
            .querySelectorAll(
               'input[name="services"]:checked'
            )
            .forEach(item => {

               services.push(
                  item.value
               );

            });

         const score =
            calculateLeadScore({
               students: formData.get("students"),
               services: services
          });

         const category =
            getLeadCategory(score);

         const payload = {

            schoolName:
               formData.get("schoolName"),

            contactPerson:
               formData.get(
                  "contactPerson"
               ),

            designation:
               formData.get(
                  "designation"
               ),

            mobile,

            email,

            city:
               formData.get("city"),

            state:
               formData.get("state"),

            students:
               formData.get(
                  "students"
               ),

            services:
               services.join(", "),

            message:
               formData.get(
                  "message"
               ),
            forclass:
               formData.get(
                  "forclass"
               )
            
         };

         try {

            setButtonLoading(
               submitButton,
               true
            );

            await submitToGoogleSheet(
               payload
            );

            showMessage(
               "schoolSuccess",
               "Thank you. Our team will contact you shortly."
            );

            form.reset();

         } catch (error) {

            showMessage(
               "schoolSuccess",
               "Something went wrong. Please try again.",
               "error"
            );

         } finally {

            setButtonLoading(
               submitButton,
               false
            );

         }

      }
   );

}

// /* =====================================
//    GENERAL FORM
// ===================================== */

// function initializeGeneralForm() {

//    const form =
//       document.getElementById(
//          "generalForm"
//       );

//    if (!form) return;

//    form.addEventListener(
//       "submit",
//       async function (event) {

//          event.preventDefault();

//          const submitButton =
//             form.querySelector(
//                'button[type="submit"]'
//             );

//          const formData =
//             new FormData(form);

//          const email =
//             formData.get("email");

//          const phone =
//             formData.get("phone");

//          if (
//             !isValidEmail(email)
//          ) {

//             showMessage(
//                "generalSuccess",
//                "Invalid email address.",
//                "error"
//             );

//             return;

//          }

//          if (
//             !isValidPhone(phone)
//          ) {

//             showMessage(
//                "generalSuccess",
//                "Invalid phone number.",
//                "error"
//             );

//             return;

//          }

//          const payload = {

//             formType:
//                "General Enquiry",

//             contactPerson:
//                formData.get("name"),

//             mobile:
//                phone,

//             email:
//                email,

//             services:
//                formData.get("subject"),

//             message:
//                formData.get("message")

//          };

//          try {

//             setButtonLoading(
//                submitButton,
//                true
//             );

//             await submitToGoogleSheet(
//                payload
//             );

//             showMessage(
//                "generalSuccess",
//                "Message sent successfully."
//             );

//             form.reset();

//          } catch (error) {

//             showMessage(
//                "generalSuccess",
//                "Submission failed.",
//                "error"
//             );

//          } finally {

//             setButtonLoading(
//                submitButton,
//                false
//             );

//          }

//       }
//    );

// }


// /* =====================================
//    CAREERS FORM
// ===================================== */

// function initializeCareerForm() {

//    const form =
//       document.getElementById(
//          "careerForm"
//       );

//    if (!form) return;

//    form.addEventListener(
//       "submit",
//       async function (event) {

//          event.preventDefault();

//          const submitButton =
//             form.querySelector(
//                'button[type="submit"]'
//             );

//          const formData =
//             new FormData(form);

//          const email =
//             formData.get("email");

//          const mobile =
//             formData.get("mobile");

//          if (
//             !isValidEmail(email)
//          ) {

//             showMessage(
//                "careerSuccess",
//                "Invalid email.",
//                "error"
//             );

//             return;

//          }

//          const payload = {

//             formType:
//                "Career Application",

//             contactPerson:
//                formData.get(
//                   "fullName"
//                ),

//             mobile,

//             email,

//             designation:
//                formData.get(
//                   "position"
//                ),

//             services:
//                formData.get(
//                   "experience"
//                ),

//             message:
//                formData.get(
//                   "message"
//                )

//          };

//          try {

//             setButtonLoading(
//                submitButton,
//                true
//             );

//             await submitToGoogleSheet(
//                payload
//             );

//             showMessage(
//                "careerSuccess",
//                "Application submitted successfully."
//             );

//             form.reset();

//          } catch (error) {

//             showMessage(
//                "careerSuccess",
//                "Submission failed.",
//                "error"
//             );

//          } finally {

//             setButtonLoading(
//                submitButton,
//                false
//             );

//          }

//       }
//    );

// }


