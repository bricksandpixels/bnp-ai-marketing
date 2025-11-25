import type ServiceTypeEnum from "@/enums/ServiceTypeEnum";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import logo from "@/assets/images/logo-name.png";
import logo2 from "@/assets/Images/icon.webp";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowUpIcon, CloudSunIcon, ImageIcon, LightbulbFilamentIcon, MountainsIcon, TrashIcon, UploadIcon } from "@phosphor-icons/react";
import { useDropzone } from "react-dropzone";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
// import LoginWithGoogle from "../auth/GoogleLogin"

import { ElevationIcon, FloorplanIcon, SketchIcon, ThreeBaseIcon } from "@/components/custom-components/Icons";
import { LuSquare } from "react-icons/lu";

const logo = () => import("@/assets/images/logo-name.png")

interface ServicePageProps {
    setSignUpMenu?: (val: boolean) => void
}

interface ValidServiceInterface {
    type: ServiceTypeEnum,
    slug: string,
    name: string,
    icon: ReactNode,
    abbreviation: string,
    designation: string,
    description: string,
    clientName: string,
    inputImage: () => Promise<{ default: string }>,
    outputImage: () => Promise<{ default: string }>
}

export const maxImageSize = 5;
export const allowedExtenstions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const servicePageData: ValidServiceInterface[] = [
    {
        slug: "elevation-to-render",
        type: "elevation_to_render",
        name: "Elevation to Render",
        icon: <ElevationIcon width="14px" height="14px" />,
        abbreviation: "Elevation",
        designation: "Interior Designer",
        clientName: "Ishan Ahluwalia",
        description: "Elevations reimagined as stunning visuals.",
        inputImage: () => import("@/assets/Images/banner/asset-5/input.png"),
        outputImage: () => import("@/assets/Images/banner/asset-5/output.png")
    },
    {
        slug: "floorplan-to-render",
        type: "floorplan_to_reality",
        name: "Floorplan To Render",
        icon: <FloorplanIcon width="14px" height="14px" />,
        abbreviation: "Floorplan",
        designation: "Architect",
        clientName: "Nur Indah",
        description: "Convert your 2D CAD Floorplan into stunning dollhouse view and realistic 3D renders.",
        inputImage: () => import("@/assets/Images/banner/asset-8/input.png"),
        outputImage: () => import("@/assets/Images/banner/asset-8/output.png")
    },
    {
        slug: "three-base-to-render",
        type: "three_base_to_render",
        name: "3D Base To Render",
        icon: <ThreeBaseIcon width="14px" height="14px" />,
        abbreviation: "3D Base",
        designation: "Interior Designer",
        clientName: "Priyanka Jayabal",
        description: "Convert raw 3D views into cinematic renders in seconds.",
        inputImage: () => import("@/assets/Images/banner/asset-6/input.png"),
        outputImage: () => import("@/assets/Images/banner/asset-6/output.png")
    },
    {
        slug: "sketch-to-render",
        type: "sketch_to_image",
        name: "Sketch To Render",
        icon: <SketchIcon width="14px" height="14px" />,
        abbreviation: "Sketch",
        designation: "Architect",
        clientName: "Baraah Muqaddam",
        description: "Instantly transform sketches into photoreal renders.",
        inputImage: () => import("@/assets/Images/banner/asset-7/input.png"),
        outputImage: () => import("@/assets/Images/banner/asset-7/output.png")
    }
];

const Placeholder = () => (
    <div className="w-full h-full pb-[56.25%] flex items-center justify-center bg-white/5 animate-pulse rounded-xl"></div>
);

const ServicePage: React.FC<ServicePageProps> = () => {
    const { service } = useParams<{ service: string }>();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState<ValidServiceInterface>();
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [inputImg, setInputImg] = useState<string>("");
    const [outputImg, setOutputImg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [logoImg, setLogoImg] = useState<string>("");
    const [isLogoLoading, setIsLogoLoading] = useState<boolean>(true)

    const handleServiceBtnClick = (slug: string) => {
        navigate(`/${slug}`)
    }

    const getRandomTime = () => {
        return Math.floor(Math.random() * 11) + 10;
    }

    const getBlob = (file: File) => {
        const b = URL.createObjectURL(file);
        return b;
    }

    const handleRemoveImage = () => {
        setSelectedImage("")
    }

    // const handleSignUpBtnClick = () => {
    //     setSignUpMenu(true);
    // };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            const b = getBlob(file);
            if (!allowedExtenstions.includes(file.type)) continue;
            if (file.size > (maxImageSize * 1024 * 1024)) continue;
            setSelectedImage(b)
        }
    }, [service])

    useEffect(() => {
        const newService = servicePageData.find((el) => el.slug === service)
        setSelectedService(newService)
    }, [service])

    useEffect(() => {
        if (!selectedService) return;

        const loadImages = async () => {
            try {
                const [inputMod, outputMod] = await Promise.all([
                    selectedService.inputImage(),
                    selectedService.outputImage()
                ]);

                setInputImg(inputMod.default);
                setOutputImg(outputMod.default);
            } catch (error) {
                console.error("Error loading service images:", error);
            } finally {
                setIsLoading(false);
            }
        }

        const loadLogo = async () => {
            try {
                const [imgModule] = await Promise.all([
                    logo(),
                ]);

                setLogoImg(imgModule.default);
            } catch (error) {
                console.error("Error loading service images:", error);
            } finally {
                setIsLogoLoading(false);
            }
        }

        loadImages();
        loadLogo();

    }, [selectedService]);


    useEffect(() => {
        if (!selectedService) return;

        selectedService.inputImage().then((mod: any) => {
            setInputImg(mod.default);
        });

        selectedService.outputImage().then((mod: any) => {
            setOutputImg(mod.default);
        });

    }, [selectedService]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    if (!service) return;

    if (!servicePageData.some(v => v.slug === service)) return;

    if (!selectedService) return;

    return (
        <div className="flex flex-col justify-center w-full min-h-screen lg:h-full">
            <div className="relative flex flex-col justify-center w-full h-full">
                <div className="absolute left-0 top-0  w-full h-full bg-dark -z-1"></div>
                <div className="p-4 min-h-16 pb-0 w-full flex items-center justify-between">
                    {isLogoLoading ? <p className="text-transparent bg-linear-to-r inline-block from-vividgreen to-azure from-20% to-60% bg-clip-text font-semibold text-4xl">bnpAI</p> : <img
                        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-44 mr-2 no-select"
                        src={logoImg}
                        alt="Logo"
                    />}
                    <button
                        // onClick={handleSignUpBtnClick}
                        className="cursor-pointer flex gap-1 items-center text-dark py-2 px-8 rounded-full font-semibold active:scale-95 border-white/10 bg-linear-to-r from-vividgreen to-azure hover:from-vividgreen hover:to-azure opacity-90 transition-opacity duration-200 hover:opacity-100 text-sm lg:hidden"
                    >
                        <span className="tracking-wider">Sign In</span>
                    </button>
                </div>
                <div className="w-full h-full overflow-y-auto flex max-lg:flex-wrap-reverse items-center p-2 justify-center gap-3">

                    <div className="relative rounded-xl z-1 h-fit lg:h-full w-full lg:w-[450px] bg-white/1 backdrop-blur-sm border border-white/10  transition-all duration-500 flex flex-col justify-between ">
                        <div className="w-full flex flex-col max-lg:gap-4 p-4 h-full">
                            <div className={`flex flex-col justify-start gap-4 lg:gap-9 w-full h-full`}>
                                <div className="w-full h-fit flex flex-col bg-white/5 border border-white/10 p-3 rounded-xl">
                                    <div className="w-full flex flex-col gap-6 text-white rounded-xl items-center tracking-wide">
                                        {/* <div className="flex flex-col gap-2 w-full">
                                            <p className="text-xl text-white tracking-wider font-semibold">{selectedService.abbreviation}</p>
                                            <p className="text-xs text-white/70 tracking-wider font-light h-8">{selectedService.description}</p>
                                        </div> */}
                                        <div className="w-full grid grid-cols-2 gap-4 place-items-center">
                                            {servicePageData.map((el, index) => {
                                                return <button key={index}
                                                    onClick={() => handleServiceBtnClick(el.slug)}
                                                    className={`w-full rounded-full text-xs py-1 px-4 flex gap-2 justify-start items-center shadow-xl cursor-pointer transform-all duration-200 ${el.type === selectedService.type ? "bg-white text-dark shadow-dark font-semibold" : "bg-white/5 shadow-dark/10 hover:bg-white/10"}`}
                                                >
                                                    <span className={`${el.type === selectedService.type ? "bg-dark" : "bg-dark/0"} p-1.5 rounded-full flex items-center justify-center`}>{el.icon}</span>
                                                    <span>{el.abbreviation}</span>
                                                </button>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex flex-col bg-white/5 border border-white/10 p-3 rounded-xl">
                                    <div {...getRootProps()} className="w-full h-[100px] md:h-[200px] flex justify-center items-center border border-dashed border-white/30 rounded-xl cursor-pointer transform-all duration-200 group">
                                        {
                                            !selectedImage ? <div className="flex flex-col w-full justify-center items-center text-white/80 px-2 py-2">
                                                <input {...getInputProps()} />
                                                <div className="flex items-center gap-2 justify-center ">
                                                    <UploadIcon weight='fill' size={16} className='text-white/80 group-hover:text-white' />
                                                    <span className="tracking-wide group-hover:text-white text-xs">Upload Your Image</span>
                                                </div>
                                                <div className="">
                                                    <span className="tracking-wide text-white/50 text-[10px]">File format: jpeg, jpg, png, webp</span>
                                                </div>
                                            </div> : <div className="relative h-full p-2">
                                                <button
                                                    className={`absolute right-1 top-1 rounded-full w-7 h-7 lg:w-7 lg:h-7 bg-[#171624] flex justify-center items-center border border-white/10 text-white tracking-wide cursor-pointer disabled:cursor-not-allowed hover:bg-white hover:text-dark transition-all duration-300 active:scale-90 disabled:scale-100 disabled:bg-white/70`}
                                                    onClick={handleRemoveImage}
                                                >
                                                    <TrashIcon size={15} weight='bold' className='text-red-500' />
                                                </button>
                                                <img src={selectedImage} className="h-full w-auto object-cover rounded-xl" />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2 max-lg:hidden">
                                    <p className="text-white tracking-wide text-sm">Choose From wide variety of styles</p>
                                    <div className="flex flex-wrap w-full gap-1 items-center text-white/70 text-xs lg:text-sm tracking-wide">
                                        {selectedService.type != "floorplan_to_reality" ? <>
                                            <div className="w-full flex gap-2 items-center">
                                                <CloudSunIcon size={14} className="text-orange-400" weight="fill" />
                                                <span>Time of day</span>
                                            </div>
                                            <div className="w-full flex gap-2 items-center">
                                                <LuSquare size={12} className="text-cyan-500" />
                                                <span>Aspect Ratio</span>
                                            </div>
                                            <div className="w-full flex gap-2 items-center">
                                                <ImageIcon size={14} weight="fill" className="text-teal-500" />
                                                <span>Copy Image style</span>
                                            </div>
                                            <div className="w-full flex gap-2 items-center">
                                                <MountainsIcon size={14} weight="fill" className="text-cyan-500" />
                                                <span>Environment Context</span>
                                            </div>
                                        </> :
                                            <>
                                                <div className="w-full flex gap-2 items-center">
                                                    <LuSquare size={12} className="text-cyan-500" />
                                                    <span>Aspect Ratio</span>
                                                </div>
                                                <div className="w-full flex gap-2 items-center">
                                                    <LightbulbFilamentIcon size={13} className="text-blue-400" weight="fill" />
                                                    <span>Lighting Mode</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center h-fit lg:px-4 lg:fixed bottom-3 left-0 z-10">
                                <button
                                    className={`w-full flex relative items-center justify-center px-4 py-3 transition-all duration-300 border bg-linear-to-r from-vividgreen to-azure opacity-70 rounded-full text-center text-dark cursor-pointer hover:opacity-100`}
                                // onClick={handleGenerateBtnClick}
                                >
                                    <div className="flex">
                                        <p className="text-base font-semibold text-black">Generate</p>
                                    </div>
                                    {/* <div className="pointer-events-auto  w-full  flex relative items-center justify-center bg-linear-to-r from-vividgreen to-azure rounded-full opacity-90 hover:opacity-100 ">
                                        <LoginWithGoogle setSignUpMenu={setSignUpMenu} classname="px-2 py-3 w-fit" buttonName="Generate" isServicePage={true} />
                                    </div> */}
                                    {selectedImage && <p className="text-white/30 text-xs mt-2 mx-auto">Estimated Render Time is {getRandomTime()}s</p>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-fit lg:h-full w-full">
                        <div className={`relative w-full h-full lg:max-h-full rounded-xl flex justify-center overflow-hidden shadow-inner bg-white/1 backdrop-blur-sm border border-white/10 p-4`}>
                            <div className="relative w-full lg:max-w-[900px] h-full flex flex-col max-lg:gap-6 gap-4 items-center">
                                <div className="w-full flex items-center justify-between gap-2 tracking-wider">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-semibold">
                                            <span className="text-xl lg:text-3xl text-transparent bg-linear-to-r inline-block from-vividgreen to-azure from-20% to-60% bg-clip-text">{selectedService.name}</span>
                                        </h1>
                                        <p className="text-white/70 text-xs lg:text-sm pl-0.5">{selectedService.description}</p>
                                    </div>
                                    <button
                                        // onClick={handleSignUpBtnClick}
                                        className="cursor-pointer flex gap-1 items-center text-dark py-3 px-8 rounded-full font-semibold active:scale-95 border-white/10 bg-linear-to-r from-vividgreen to-azure hover:from-vividgreen hover:to-azure opacity-90 transition-opacity duration-200 hover:opacity-100 text-sm max-lg:hidden"
                                    >
                                        <span className="tracking-wider">Sign In</span>
                                    </button>
                                </div>
                                <div className="w-full min-h-auto">

                                    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">

                                        {isLoading ? (
                                            <div className="absolute top-0 left-0 w-full h-full">
                                                <Placeholder />
                                            </div>
                                        ) : (
                                            <div className="absolute top-0 left-0 w-full h-full inline-block border-dark">
                                                <ReactCompareSlider
                                                    className="w-full h-full border-dark rounded-xl"
                                                    // Removed redundant w-full h-full from the main div
                                                    itemOne={
                                                        <ReactCompareSliderImage
                                                            // Added h-full to ensure the image fills the slider's item height
                                                            className="w-full h-full object-contain"
                                                            src={inputImg}
                                                            loading="lazy"
                                                            alt="Before Image"
                                                            onContextMenu={(e) => e.preventDefault()}
                                                        />
                                                    }
                                                    itemTwo={
                                                        <ReactCompareSliderImage
                                                            // Added h-full
                                                            className="w-full h-full object-contain"
                                                            src={outputImg}
                                                            loading="lazy"
                                                            alt="After Image"
                                                            onContextMenu={(e) => e.preventDefault()}
                                                        />
                                                    }
                                                    // Handle component remains the same
                                                    handle={
                                                        <div className="relative flex items-center justify-center w-10 md:w-20 h-full cursor-pointer">
                                                            <div className="absolute bg-linear-to-b from-g1 to-g2 w-1 h-full" />
                                                            <div className="flex justify-center items-center w-16 h-16 rounded-full z-10 overflow-hidden">
                                                                <img
                                                                    src={logo2}
                                                                    loading="lazy"
                                                                    alt="logo"
                                                                    className="w-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer text remains outside the aspect-ratio container */}
                                    <p className="text-left mt-2">
                                        <span className="text-white/50 text-xs lg:text-sm">Created by {selectedService.designation} </span>
                                        <span className="text-azure text-xs lg:text-sm">&#64;{selectedService.clientName}</span>
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-2 lg:hidden">
                                    <p className="text-white tracking-wide max-lg:text-sm">Choose From wide variety of styles</p>
                                    <div className="flex flex-wrap gap-2 items-center text-white/70 text-xs lg:text-sm tracking-wide">
                                        {selectedService.type != "floorplan_to_reality" ? <>
                                            <div className=" flex items-center gap-1">
                                                <CloudSunIcon size={14} className="text-orange-400" weight="fill" />
                                                <span>Time of day</span>
                                            </div>
                                            <div className=" flex items-center gap-1">
                                                |
                                                <LuSquare size={12} className="text-cyan-500" />
                                                <span>Aspect Ratio</span>
                                            </div>
                                            <div className=" flex items-center gap-1">
                                                |
                                                <ImageIcon size={14} weight="fill" className="text-teal-500" />
                                                <span>Copy Image style</span>
                                            </div>
                                            <div className=" flex items-center gap-1">
                                                |
                                                <MountainsIcon size={14} weight="fill" className="text-cyan-500" />
                                                <span>Environment Context</span>
                                            </div>
                                        </> :
                                            <>
                                                <div className=" flex items-center gap-1">
                                                    <LuSquare size={13} className="text-cyan-500" />
                                                    <span>Aspect Ratio</span>
                                                </div>
                                                <div className=" flex items-center h-full gap-1">
                                                    |
                                                    <LightbulbFilamentIcon size={13} className="text-blue-400" weight="fill" />
                                                    <span >Lighting Mode</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="absolute h-10 w-full left-0 bottom-2 rounded-full bg-white/10 hidden lg:flex gap-4 items-center px-4 tracking-wide border border-white/5">
                                    <ArrowUpIcon className={`text-white ${selectedImage && "animate-bounce"} -rotate-90`} size={24} />
                                    <p className="text-white text-sm">Start Generating your image at left</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ServicePage