import { useEffect, useState, useContext } from "react";
import styles from "./posts-filter.module.scss"


export const PostsFilter = () => {
 // Состояния для выбранного типа и вектора
 const [selectedType, setSelectedType] = useState(null);
 const [selectedVector, setSelectedVector] = useState(null);

 // Обработчик изменения выбранного типа
 const handleTypeChange = (e) => {
   setSelectedType(e.target.value);
 };

 // Обработчик изменения выбранного вектора
 const handleVectorChange = (vector) => {
   setSelectedVector(vector);
 };

 return (
   <>
    
     {/* Фильтр по вектору */}
     <div >
       <div >
         <label>
           <input
             type="radio"
             value="option1"
             checked={selectedVector === "option1"}
             onChange={() => handleVectorChange("option1")}
           />
           Option 1
         </label>
       </div>
       <div>
         <label>
           <input
             type="radio"
             value="option2"
             checked={selectedVector === "option2"}
             onChange={() => handleVectorChange("option2")}
           />
           Option 2
         </label>
       </div>
       <div >
         <label>
           <input
             type="radio"
             value="option3"
             checked={selectedVector === "option3"}
             onChange={() => handleVectorChange("option3")}
           />
           Option 3
         </label>
       </div>
       <div >
         <label>
           <input
             type="radio"
             value="option4"
             checked={selectedVector === "option4"}
             onChange={() => handleVectorChange("option4")}
           />
           Option 4
         </label>
       </div>
     </div>
   </>
 );
};
