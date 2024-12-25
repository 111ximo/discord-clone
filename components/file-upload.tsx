"use client";
import{FileIcon, X} from 'lucide-react';
import Image from 'next/image';
import {UploadDropzone} from '@/lib/uploadthing';

import "@uploadthing/react/styles.css"

interface FileUpLoad{
    onChange:(url?:string)=>void;
    value:string;
    endpoint:"messageFile"|"serverImage";
}



export const FileUpLoad=({
    onChange,
    value,
    endpoint
}:FileUpLoad)=>{
    //const fileType = value ? getFileType(value) : undefined;
    let fileType: string | undefined = undefined;

    try {
      const urlObj = new URL(value);
      fileType = urlObj.searchParams.get("ext") ?? undefined;
    } catch {
      console.error("URL 解析失败:", value);
    }

    if(value&&fileType!=="pdf"){
        return (
            <div className="relative w-24 h-24">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
            <button
                onClick={()=>onChange("")}
                className="bg-rose-500 text-white p-1
                rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
            >
                <X  className="h-4 w-4" />
            </button>
            </div>
        )
    }

    if(value&&fileType==="pdf"){
        return (
            <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10 '>
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a 
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
                >
                    {value}
                </a>
                <button
                    onClick={()=>onChange("")}
                    className="bg-rose-500 text-white p-1
                    rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                >
                    <X  className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return(
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("上传完成的响应:", res);
                if (res && res.length > 0) {
                  const file = res[0];
                  console.log("file 对象:", file);
        
                  // 假设 file.name = "abc.png"
                  const extension = file.name.split(".").pop()?.toLowerCase() ?? "unknown";
        
                  // 原始 URL 不变，但把扩展名放进查询参数
                  const originalUrl = file.url; 
                  const finalUrl = `${originalUrl}?ext=${extension}`;
        
                  // 拼好的 URL 传给父组件
                  onChange(finalUrl);
                }
              }}
            onUploadError={(error:Error)=>{
                console.log(error)
            }}
        />
    )
}