class AppConfig {
    public registerUrl = "http://localhost:4001/api/auth/register/";
    public loginUrl = "http://localhost:4001/api/auth/login/";
    public AdminVacationsUrl = "http://localhost:4001/api/admin/vacations/";
    public UserVacationsUrl = "http://localhost:4001/api/user/vacations/";
    public UserFollowUrl = "http://localhost:4001/api/user/follow/";   
    public vacationsImagesUrl = "http://localhost:4001/api/vacation/images";   
}

const appConfig = new AppConfig();

export default appConfig;
