"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CLIENT_NAMES_MAP=void 0;const client_names_1=require("./client-names");exports.CLIENT_NAMES_MAP={...client_names_1.CLIENT_NAMES.reduce((acc,name)=>({...acc,[name]:name}),{}),AugmentedAIRuntime:"SageMakerA2IRuntime",CUR:"CostAndUsageReportService",CodeArtifact:"Codeartifact",CodeStarNotifications:"CodestarNotifications",CodeStarconnections:"CodeStarConnections",CognitoIdentityServiceProvider:"CognitoIdentityProvider",DMS:"DatabaseMigrationService",Discovery:"ApplicationDiscoveryService",ELB:"ElasticLoadBalancing",ELBv2:"ElasticLoadBalancingV2",EMRcontainers:"EMRContainers",ES:"ElasticsearchService",Finspacedata:"FinspaceData",ForecastQueryService:"Forecastquery",ForecastService:"Forecast",IVS:"Ivs",IdentityStore:"Identitystore",Iot:"IoT",IotData:"IoTDataPlane",KinesisVideoSignalingChannels:"KinesisVideoSignaling",LexRuntime:"LexRuntimeService",MQ:"Mq",RDSDataService:"RDSData",SESV2:"SESv2",SavingsPlans:"Savingsplans",StepFunctions:"SFN",TranscribeService:"Transcribe"};
