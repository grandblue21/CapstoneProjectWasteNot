import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import StaffDashboard from './dashboard/StaffDashboard';
import getProfile from '../hook/getProfile';
import { ROLES } from '../constants';

const App = () => {

    // Check Session
    const session = getProfile();

    return session.profile ? (session.profile.role == ROLES.customer ? <Dashboard/> : <StaffDashboard/>) : <Login/>;
}


{/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

    <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
        ),
        headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="60%"/>
        )
    }}/>

    <ScrollView style={{ flex: 1, padding: SIZES.medium }}>

        <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
                if (searchTerm) {
                    router.push(`/search/${searchTerm}`);
                }
            }}
        />

        <Popularjobs/>
        <Nearbyjobs/>

    </ScrollView>

</SafeAreaView> */}

export default App;