const ServiceTypeEnum = {
    TextToImage: 'text_to_image', 
    SketchToImage: 'sketch_to_image',
    ThreeBaseToRender: 'three_base_to_render',
    ElevetionToRender: 'elevation_to_render',
    FloorplanToReality: 'floorplan_to_reality',
    ImageToVideo: "image_to_video",
    Upscale: "upscale",
    ImageEditing: "smart_image_editing",
    ThreeModelToRender: "three_model_to_render",
    AiInteriorDesigner: "ai_interior_designer"
} as const;

type ServiceTypeEnum = typeof ServiceTypeEnum[keyof typeof ServiceTypeEnum];

export default ServiceTypeEnum;