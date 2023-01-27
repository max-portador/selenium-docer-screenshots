import { FetchFilesList } from "features/FetchFilesList"
import { LoadImages } from "features/LoadImages"
import { StartSelenium } from "features/StartSelenium"
import { VStack } from "shared/ui/Stack"
import { Page } from "widgets/Page/Page"


const MainPage = () => {


    return (
        <Page>
            <VStack max gap={16}>
                <StartSelenium/>
                <LoadImages/>
                <FetchFilesList />
            </VStack>
        </Page>

    )
}

export default MainPage