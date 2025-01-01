import { Client, Account, ID, Databases} from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.skage.dev.skgmall",
    projectId: "66475a87000539ee946b",
    databaseId: "66475db50030e53748ef",
    userCollectionId: "66475de90000783e70e4"
}



// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const db = new Databases(client);


export default async function createUser  (email: string, password: string, username: string){
    try{
        console.log('creating account')
        const newAccount = await account.create(
            ID.unique() ,
            email,
            password,
            username
        )
        console.log('account created')
        if (!newAccount) throw new Error;
        
        listSession()
        // console.log('signing in')
        // await signIn(email, password)
        // console.log('signing in compelete')

        console.log('creating new document')
        const newUser = await db.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
            },
        )
        console.log('document created')
        return newUser;

    }catch(error){
        console.log(error);
        throw error;
    }

   
}

export async function signIn(email: string, password: string) {
    try {
        console.log('deleting session')
        const dele = await account.deleteSessions();
        console.log('deleting session complete')
        
        console.log('creating new session')
        if (dele) {const session = await account.createEmailPasswordSession(email, password);
            console.log(' session created')
        return session;}
    } catch (error) {
      throw error;  
    }
}

export async function listSession() {
    const sessions = account.getSession('current')
    console.log((await sessions).$id)
    console.log((await sessions).provider);
    console.log((await sessions).providerUid);
    console.log((await sessions).providerAccessToken);
}