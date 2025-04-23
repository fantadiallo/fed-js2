export default async function router(pathname = window.location.pathname){
    console.log('routhing to', pathname);
    switch (pathname){
        case '/':
            case '/index.html':
                const { default: renderHome} = await import("./views/home.js");
                renderHome();
                break;
                case "/auth/register":
                    case "/auth/register.html":
                        await import("./views/register.js"); 
                        break;
            
                    case "/auth/login":
                    case "/auth/login.html":
                        await import("./views/login.js");
                        break;
            
                    case "/create/":
                    case "/create/index.html":
                        await import("./views/create.js");
                        break;
            
                    case "/details/":
                    case "/details/index.html":
                        await import("./views/details.js");
                        break;
                    case "/profile/":
                    case "/profile/index.html":
                        await import("./views/profile.js");
                        break;
            
                    case "/NotFound/":
                    case "/NotFound/index.html":
                        await import("./views/NotFoundView.js");
                        break;
                }
            }