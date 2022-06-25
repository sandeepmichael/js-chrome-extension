
const showaction = {todo: 'showPageAction'}
chrome.runtime.sendMessage(showaction)


main();

function main() {
    var data = {};
    sliderGen();
    chrome.runtime.onMessage.addListener( function(msg) {
        if(msg.todo == "toggle") {
          slider();
        }
      });

      data = getAlluserDetails();   
      var bodycontainer = document.getElementById("slider").querySelector("#sbodycontainer");
      bodycontainer = bodycontainer.querySelector("#objectvalue")
      bodycontainer.value = JSON.stringify(data)                      
      window.onscroll = function() {
          data = getAlluserDetails();
          //alert(JSON.stringify(data));
          var bodycontainer = document.getElementById("slider").querySelector("#sbodycontainer");
          bodycontainer = bodycontainer.querySelector("#objectvalue")
          bodycontainer.value = JSON.stringify(data)       
      }

}

function sliderGen() {
    var slider = document.createElement("div");
    slider.id = "slider";
    

    var sliderDivInnerHTML = "\
    <div id='sheader'><h2>Linkedin Data</h2><hr/></div>\
    <div id='sbodycontainer'>\
    <textarea id='objectvalue'></textarea>\
    </div>";

    slider.innerHTML += sliderDivInnerHTML;
    {
   
    
      var x = document.getElementsByClassName("ad-banner");
      var y = $(".ad-banner-container")
      try {
        x[0].remove();
        y.remove();
      } catch(err) {console.log(err);}
    }

    document.body.prepend(slider);
}

function slider() {
    var slider = document.getElementById("slider");

    var styler = slider.style;

    if(styler.width == "0px") {
        styler.width = "400px";
    } else {
        styler.width = "0px";
    }
}

function getAlluserDetails(){
  let profile = {};

  const profileSection = document.querySelector(".pv-top-card");
    
  const fullNameElement = profileSection?.querySelector('h1')
  const name = fullNameElement?.textContent || null

  const titleElement = profileSection?.querySelector('.text-body-medium')
  var title = titleElement?.textContent || null

  var tbs = profileSection?.querySelectorAll(".text-body-small")
  const locationElement = ((tbs) ? tbs[1] : null)
  var location = locationElement?.textContent || null

  let contactinfo = document.querySelector('#top-card-text-details-contact-info') 
  let contact = contactinfo?.getAttribute('href') || null;

  const photoElement = document.querySelector(".pv-top-card-profile-picture__image") || profileSection?.querySelector('.profile-photo-edit__preview')
  const profile_pic = photoElement?.getAttribute('src') || null

  const descriptionElement = document.querySelector('div#about')?.parentElement.querySelector('.pv-shared-text-with-see-more > div > span.visually-hidden')// Is outside "profileSection"
  var about = descriptionElement?.textContent || null
      

  //const url = window.location.url;
  let rawProfileData = {
      name,
      title,
      location,
      profile_pic,
      about,
      contact,
      //url
  }

let profileData = {
      Name: getCleanText(rawProfileData.name),
      title: getCleanText(rawProfileData.title),
      location: getCleanText(rawProfileData.location),
      about: getCleanText(rawProfileData.about),
      profile_pic: rawProfileData.profile_pic,
     // url: rawProfileData.url
     contact : rawProfileData.contact,
  }

 // return profileData;


 var nodes = document.querySelector('div#experience')?.parentElement.querySelectorAll('ul.pvs-list > li.artdeco-list__item > div.pvs-entity') || [];
 //alert(JSON.stringify(nodes));
 let arrexp = []
 
 //loop over nodes to push data in UwU
 for (const node of nodes) {
   
   let experiences = node.querySelectorAll('span.visually-hidden');

   let experiences_strings = []

   for (const experience of experiences) { 
     // console.log(experience.textContent);
     experiences_strings.push(experience.textContent);
   }  
   arrexp.push(experiences_strings);

 
 }//loop ends here

 var experiences = arrexp;
 //........

//


 var nodes = document.querySelector('div#education')?.parentElement.querySelectorAll('ul.pvs-list > li.artdeco-list__item > div.pvs-entity') || [];
//alert(JSON.stringify(nodes))
let educationarray = [];



for(const node of nodes){
  let educations = node.querySelectorAll('span.visually-hidden');

  let educations_strings = []

  for (const education of educations) { 
   
    educations_strings.push(education.textContent);
  }

  educationarray.push(educations_strings)
}
//extraction of education ends here
var educations = educationarray

//...........................................
var nodes =  document.querySelector('div#skills')?.parentElement.querySelectorAll('ul.pvs-list > li.artdeco-list__item > div.pvs-entity') || [];
let skillsarray = [];

for(const node of nodes){
 
  let skillsitems = node.querySelectorAll('span.visually-hidden')
  let skills_strings = [];

  for (const skill of skillsitems){
    skills_strings.push(skill.textContent)
  }

skillsarray.push(skills_strings)
}
var skilllist = skillsarray;

  //............. 




  var certnodes = document.querySelector('div#licenses_and_certifications')?.parentElement.querySelectorAll('ul.pvs-list > li.artdeco-list__item > div.pvs-entity') || [];
  var certs = [];
  
 
  if(certnodes) { //if the section exists or nah
    for(const node of certnodes) {
      let certifications = node.querySelectorAll('span.visually-hidden')
      let certification_strings= [];
      for(const certification of certifications){
        certification_strings.push(certification.textContent)
       }
      certs.push(certification_strings);
    }//for loop ends

  }
  var certificationlist = certs;







 profile = {
  "profileData": profileData,
  "experiences": experiences,
  "education": educations,
  "certifications": certificationlist,
  "skills": skilllist,
 
}
return profile;

}














function getCleanText(text) {
  const regexRemoveMultipleSpaces = / +/g
  const regexRemoveLineBreaks = /(\r\n\t|\n|\r\t)/gm

  if (!text) return null

  const cleanText = text
    .replace(regexRemoveLineBreaks, '')
    .replace(regexRemoveMultipleSpaces, ' ')
    .replace('...', '')
    .replace('See more', '')
    .replace('See less', '')
    .trim()

  return cleanText
}


