/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/Main/MainPage.vue'
import DomainPage from '@/pages/Domain/DomainPage.vue'
import NotFoundPage from '@/pages/NotFound/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'MainPage',
		component: MainPage,
		props: { store_path: ["MainPage"] },
	},
	{
		path: '/domains/',
		name: 'DomainPage',
		component: DomainPage,
		props: { store_path: ["DomainPage"] },
	},
	{
		path: "/:pathMatch(.*)*",
		name: 'NotFoundPage',
		component: NotFoundPage,
		props: { store_path: ["NotFoundPage"] },
	}
]

const router = createRouter({
	history: createWebHistory("/"),
	routes
})

export default router
