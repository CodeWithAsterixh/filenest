/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FileCard from '../../Components/FileCard/FileCard';
import './Home.css';
import { CloudArrowUp, FileDotted, FilePlus } from '@phosphor-icons/react';
import { useFileUpload } from '../../Functions/useFileUpload';

function Home() {
  // Access files from the Redux store
  const files = useSelector((state) => state.files);
  const types = useSelector((state) => state.categories.allTypes);
  const category = useSelector((state) => state.categories.currentCategory);
  const password = useSelector((state) => state.password.password);// Fetch this from state or props
  const { uploadProcess, handleFileChange } = useFileUpload(password);
  const [categorized, setCategorized] = useState([])
  const fileInputRef = useRef(null);
  useEffect(() => {
    console.log(files)
  }, [files])
  useEffect(() => {
    console.log(types)
  }, [types])
  useEffect(() => {
    if(files){
      if(category !== 'others'){
        const categorizedFiles = files.filter(file => !file.type.includes(category))
        setCategorized(categorizedFiles)
      }else{
        const categorizedFiles = files.filter(file => file.type.includes('image') || file.type.includes('video'))
        setCategorized(categorizedFiles)
      }

      let categorizedFiles;
      switch (category) {
        case 'videos':
          categorizedFiles = files.filter(file => file.type.includes('video'))
          break;
        case 'photos':
          categorizedFiles = files.filter(file => file.type.includes('image'))
          break;
        case 'others':
          categorizedFiles = files.filter(file => !file.type.includes('image') && !file.type.includes('video'))
          break;
      
        default:
          categorizedFiles = files
          break;
      }
      setCategorized(categorizedFiles)
    }
  }, [category, files])

  
  

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="Home">
      
      <input
            type="file"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
            style={{display: 'none'}}
          />
      {uploadProcess.process > 0&&uploadProcess.process < 3? 
        <>
            <div className='uploading'>
              <i onClick={handleButtonClick} >
                <CloudArrowUp size={100} />
              </i>
              <p>Uploading: {uploadProcess.size} files</p>
            </div>
          </>
        :<div className="filesContainer">
        {/* Check if files are loaded and map them to FileCard components */}
        {files && categorized.length > 0 ? (
          categorized.map((file) => (
            <FileCard key={file.id} file={file} />
          ))
        ) : (
          <div className="nofile">
          <p>No files available</p>
          <i onClick={handleButtonClick} >
            <FilePlus size={100} />
          </i>
          </div>// Display a message if no files are present
        )}
      </div>
      }
    </div>
  );
}

export default Home;