import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import routeConfig from './routes/routes';

import '@fontsource/inter/500.css'
import './styling/scss/global.scss'
import { Suspense } from 'react';
import Loader from './common/Loader/Loader';

const RouteWrapper = (children: React.ReactNode | null) => (
    <Suspense fallback={<Loader />}>{children}</Suspense>
);

function App() {

    function groupRoutesByLayout(routes:any) {
        const layoutMap = new Map();

        routes?.forEach((route:any) => {
            const layout = route?.layout;
            if (!layoutMap?.has(layout)) { layoutMap?.set(layout, []) }
            layoutMap?.get(layout)?.push(route);
        });

        return layoutMap;
    }

    function renderRoutesGroupedByLayout(routes:any) {

        const layoutGroups = groupRoutesByLayout(routes);

        return Array?.from(layoutGroups?.entries())?.map(([Layout, groupedRoutes], index) => {
            const authRoutes = groupedRoutes?.filter((route:any) => route?.auth);
            const publicRoutes = groupedRoutes?.filter((route:any) => !route?.auth);

            return (
                <Route key={index} element={<Layout />}>
                    {/* Public routes */}
                    {publicRoutes?.map(({ path, component: Component }:any) => (
                        <Route key={path} path={path} element={RouteWrapper(<Component />)} />
                    ))}

                    {/* Auth routes wrapped in PrivateRoute */}
                    {authRoutes?.length > 0 && (
                        <Route key={`${index}-auth`}>
                            {authRoutes?.map(({ path, component: Component }:any) => (
                                <Route key={path} path={path} element={RouteWrapper(<Component />)} />
                            ))}

                        </Route>
                    )}
                </Route>
            );
        });
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {renderRoutesGroupedByLayout(routeConfig)}
                <Route path="*" element={<Navigate replace to="/main/dashboard" />} />
            </>
        )
    );

    return (
        <Box w='100%' style={{ fontFamily: 'Inter, sans-serif' }} >
            <RouterProvider router={router} />
        </Box>
    );
}

export default App;
