<template>
	<view class="wrap">
		<view class="pageHeader">
			<u-icon style="font-size:40rpx;" name="arrow-left" @tap="customGoBack"></u-icon>
			申请开店<view></view>
		</view>
		<view style="background-color:#7A83D2;height:72rpx;line-height:72rpx;text-align: center;">
			<view v-if="!applyStatus">
				<u-icon style="font-size:40rpx;transform: rotate(180deg);vertical-align: text-top;" name="info-circle-fill"></u-icon>
				请谨慎选择，成功入驻后无法再次修改。
			</view>
			<view v-else>开店申请正在审批中...</view>
		</view>
		<view>
			<scroll-view scroll-y="true"  :style="{height:scrollViewHeight}">
				<view v-if="!applyStatus" style="padding:0 40rpx 40rpx;">
					<view class="attrLabel">姓名</view>
					<u-field disabled class="publishField" label-width="0" v-model.trim="applyForm.idcardName"  placeholder="姓名" :border-bottom="false"></u-field>
					<view class="attrLabel">身份证</view>
					<u-field disabled @blur="validateId" class="publishField" label-width="0" v-model.trim="applyForm.idcardNo"  placeholder="身份证" :border-bottom="false"></u-field>
<!--				<view class="attrLabel">身份证照片</view>
 					<view class="card flex-row-between-center">
						<view style="width:45%" class="flex-col-around-center">
							<u-upload class="publishUpload" :file-list="frontList" :auto-upload="true" :preview-full-image="true" :multiple="false"
                 @on-choose-complete="img0UploadStart" @on-success="frontChosen" @on-remove="frontRemove" :max-count="1"
								 :action="`${apiUrl}/api/client/file/v1/upload`" max-size="10*1024*1024"
								upload-text="大小限制10M" ></u-upload>
							<view style="color:#767676;font-size:24rpx">上传身份证人像面</view>
						</view>
						<view style="width:45%" class="flex-col-around-center">
							<u-upload class="publishUpload" :file-list="backList" :auto-upload="true" :preview-full-image="true" :multiple="false"
                 @on-choose-complete="img1UploadStart" @on-success="backChosen" @on-remove="backRemove" :max-count="1"
								 :action="`${apiUrl}/api/client/file/v1/upload`" max-size="10*1024*1024"
								upload-text="大小限制10M" ></u-upload>
							<view style="color:#767676;font-size:24rpx">上传身份证国徽面</view>
						</view>
					</view> -->
<!-- 					<view class="attrLabel">身份证有效期类型</view>
					<view @tap="showType">
						<u-field :disabled="true" class="publishField" label-width="0" v-model.trim="typeName"  placeholder="身份证有效期类型" :border-bottom="false">
							<view slot="right">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</u-field>
					</view> -->
<!-- 					<view v-if="applyForm.periodValidityType==='0'">
						<view class="attrLabel">有效期类型起</view>
						<view @tap="validShow0=true">
							<u-field :disabled="true" class="publishField" label-width="0" v-model.trim="validStart"  placeholder="有效期类型起" :border-bottom="false">
								<view slot="right">
									<u-icon name="arrow-right"></u-icon>
								</view>
							</u-field>
						</view>
						<view class="attrLabel">有效期类型止</view>
						<view @tap="validShow1=true">
							<u-field :disabled="true" class="publishField" label-width="0" v-model.trim="validEnd"  placeholder="有效期类型止" :border-bottom="false">
								<view slot="right">
									<u-icon name="arrow-right"></u-icon>
								</view>
							</u-field>
						</view>
					</view> -->
					<view style="margin-top:30rpx;display:flex;justify-content: space-between;align-items: flex-start;">
						<u-checkbox class="customCheck" v-model="agreeProtocol" shape="circle"></u-checkbox>
						<view style="color:#F3F4F6;width:95%">我已阅读并同意
							<span class="protocol" @tap="showProtocol('userAgreement')">《创作者合作协议》</span>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="position:fixed;bottom:0;width:100%;padding:30rpx;background-color:#18181c ;border-top:2rpx solid #59595D">
			<view v-if="!applyStatus" class="button" @tap="doApply">申请开店</view>
			<view v-else class="button" @tap="doCancel">撤销申请</view>
		</view>
		<u-select class="applyStore" v-model="typeSelectShow" mode="single-column" :list="idTypeList" @confirm="typeConfirm"></u-select>
		<u-picker @confirm="startConfirm" class="applyStore" mode="time" v-model="validShow0" :params="params"></u-picker>
		<u-picker @confirm="endConfirm" class="applyStore" mode="time" v-model="validShow1" :params="params"></u-picker>
		<u-modal class="protocolModal" v-model="protocolShow" :titleStyle="titleStyle" :show-title="true"
			:title="protocolTitle">
			<scroll-view scroll-y="true" style="height:500rpx;">
				<view style="padding:0 30rpx 30rpx;">
	欢迎您与揽悦经营者共同签署本《创作者合作协议》（下称'本协议'）并使用揽悦服务！
	【审慎阅读】您在流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、 充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向揽悦客服咨询。
	【签约动作】当您按照页面提示填写信息、 
	阅读并同意本协议后，即表示您已充分阅读、理解并接受本协议的全部内容，并与揽悦达成一致。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止签约。
	一、定义
	揽悦：指包括揽悦网（域名为lanyueverse.com）网站及客户端。
	辰宇世嘉：揽悦网的经营主体，以揽悦网公示的证照信息为准，为重庆辰宇世嘉数字科技有限公司。
	揽悦规则包括在所有揽悦已经发布及后续发布的全部规则以及在公告栏、论坛、帮助中心等位置发布的各类规则、实施细则、产品流程说明、公告等。
	    青春尚品：指在区块链上载有数字作品数字摘要信息及青春尚品ID的数据包，形式包括但不限于图片、声音、视频等。
	青春尚品ID：指数字作品在区块链上确权后以数字形式展示的唯一标识/编号。
	地址：每个用户账号在区块链上的地址。
	智能合约：指一种旨在以信息化方式传播、验证或执行合同的计算机协议。
	数字作品或作品：指由作者原创的，根据本协议的约定进行确权或转让的作品。
	数字作品交易：指由揽悦或其指定主体开发并运营的，对已经在区块链上进行确权并已生成数字的数字作品逬行交易。
	区块链：指一个具有“不可伪造”、“全程留痕”、“可以追溯”、“公开透明”、“集体维护”等特征的，储存数据或信息的分布式账本或数据库。
	著作权：指版权方在全球范围内根据各地域范围内全部现行法律享有的关于本协议约定作品的全部现有著作权以及与著作权有关的全部权利。
	确权：指版权方以哈希函数的数字信息形式将作品或作品的数字摘要信息存储到本协议约定的区块链上进行保存，并利用区块链去中心化和分布式记账等特点对作品的作者、内容、保存时间、声称的权利人等内容进行记载，保证存储的电子数据不被篡改的方式。
	铸件：指将数字作品在区块链上逬行作品或作品的数字摘要信息存放并生成青春尚品ID的确权过程。
	发售：指将已上链的青春尚品或作品衍生品进行公开销售。
	作品衍生品：带有数字作品及青春尚品ID的各类有形物，包括但不限于衣物、鞋子、杯子、 明信片等实物。
	人身权：指作者对其作品所享有的根据法律法规无法分割转让的，且与作者人身相联系或者密不可分而又无直接财产内容的人身权利，包括署名权等著作权。
	财产权：指版权方享有的根据法律法规可以分割转让的，且与作品所有权同时转让的，除人身权外的包括但不限于复制权、发行权、改编权等全部著作权财产权利。
	版权方：数字作品原创作者或通过合法转让已获得全部财产的著作权人，本协议中的“您”。
	独家：指在本协议有效期和全球范围内，版权方仅许可揽悦根据协议的约定展示、交易、寄售、存管约定的青春尚品。
	费用：指根据本协议应付的费用及其他款项。
	所有权：指对具有青春尚品ID并载有数字作品的青春尚品，以及相关物品进行占有、使用、收益和处分的权利。
	所有权人：指有权对具有青春尚品ID并载有数字作品的青春尚品，以及相关物品逬行占有、 使用、收益和处分的权利的人。
	关联公司：指与揽悦之间存在直接或间接控制关系或重大影响关系的企业，包括持有辰宇世嘉股权超过5%的股东、辰宇世嘉的子公司、辰宇世嘉实际控制人控制的其他企业等。
	二、协议范围
	2.1签约主体
	【平等主体】本协议由您与辰宇世嘉共同缔结，本协议对您与辰宇世嘉均具有合同效力。
	【主体信息】辰宇世嘉是指经营揽悦的法律主体，您可随时查看揽悦各网站首页底部公示的证照信息以确定与您履约的主体。本协议项下，揽悦经营者可能根据揽悦的业务调整而发生变更，变更后的揽悦网经营者与您共同履行本协议并向您提供服务.揽悦经营者的变更不会影响您本协议项下的权益。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。
	2.2补充协议
	由于互联网高速发展，您与辰宇世嘉签署的本协议列明的条款并不能完整罗列并覆盖您与辰宇世嘉所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，辰宇世嘉法律声明、隐私权政策、规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用揽悦服务，视为您同意上述补充协议。
	三、	合作内容
	3.1您依据揽悦的规则和格式要求通过揽悦网上传青春尚品，进行展示、交流，并使用区块链确权服务进行铸件、交易。您同意由揽悦对青春尚品的展示、销售、赠予以及将青春尚品ID使用在作品衍生品上进行销售，您仍是青春尚品的所有权人。在揽悦网上完成交易后.您将青春尚品所有权和数字作品的全部著作权财产权转让给买家。揽悦向您收取一定的服务费，包括展示平台的提供、交易上链服务费以及交易服务费等。
	3.2揽悦在合作过程中依据本身的技术能力和合作方技术资源提供技术服务及信息服务，为您提供青春尚品交易服务，并创造青春尚品交易机会。作品衍生品的销售形式可以是实体物体接销售，也可以兑换卡、兑换券等形式销售，您同意和理解揽悦有权对衍生品销售的规则、形式、数量、价格等进行自主决策。
	3.3揽悦保护作品不受歪曲及作者在作品上署名的权利，并保证数字作品交易的规则含有尊重和保护著作权人的相关条款。
	3.4您上传在揽悦网的青春尚品符合中华人民共和国各项法律法规要求，不得直接及间接涉及黄、赌、毒，低俗内容，宗教和政治。
	四、	青春尚品处分 
	4.1双方同意，完成作品确权及主体身份认证后，载有该作品数字摘要信息及青春尚品ID的青春尚品将在揽悦网完成上架展示、发售或赠予。
	4.2青春尚品在揽悦网的展示和详情应遵守揽悦网的各项规则和双方另行约定。
	4.3您知悉并同意，根据本协议和揽悦网的规定，交易完成后，青春尚品的所有权及数字作品在全球范围内除人身权外的财产权将转让给作品的受让方，即揽悦网内买家，转让的权利包括：对青春尚品进行个人端的占有、使用、处分、收益的权利，商用除外；作品的复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权等著作权财产权仅限个人使用，商用除外；对青春尚品进行许可使用的权利等。
	4.4在所有权转移至买家前，您承诺免费授予揽悦及其关联公司使用数字作品复制权、发行权、展览权、信息网络传播权以及可再许可第三方使用上述权利的权利，包括但不限于存储、使用、复制、修订、编辑、发布、展示、翻译、分发、宣传青春尚品上架信息并制作衍生品等权利，并且可以自身名义对第三方侵权行为取证及提起诉讼的权利。
	五、费用
	5.1双方同意并确认，青春尚品或作品衍生品在揽悦网上完成交易后，揽悦将收取相应的技术服务费和青春尚品以及衍生品制作成本等费用。其中您定向发行的青春尚品，分成即为发行销售收入的50%（税前）；非定向发行的青春尚品，分成即发行销售收入的50%（税前）。在交易成功24小时内，平台会将分成结算至您的揽悦电子账户中，您可以实时发起提现。
	5.2揽悦和您需各自承担各自的各项税金及费用。若您为自然人，可选择揽悦的灵工税筹服务（需签署《自由人协议》）或由揽悦代扣代缴（付费）。若您为法人等组织，需先向揽悦提供税率6%的增值税专用发票。若您提供低于6%税率的发票，揽悦有权在待支付的费用中扣除税率差额的部分税款。
	5.3开票信息如下：
	名称：重庆辰宇世嘉数字科技有限公司有限责任公司
	税号：91500105MABTLADWXG
	地址：重庆市江北区北城天街40号2幢8-13(自主承诺)
	办公电话：023-67020601
	账户号码：0102014170001365
	开户银行：重庆三峡银行股份有限公司江北支行
	开户行行号：321653001024
	六、承诺和保证
	6.1您保证在上传揽悦网的作品是由您独立创作的、所有的或有权进行处分的，保证作品不会侵犯他人的著作权、肖像权、名誉权、隐私权等权利。如您上传的作品侵犯他人著作权、肖像权、名誉权、隐私权等权利的，与辰宇世嘉无关，由您自行处理诉讼和纠纷，给辰宇世嘉带来的名誉和资金损失，辰宇世嘉保留追溯的权利。
	6.2您保证上传揽悦网的作品不会在其他区块链上链或其他任何平台上架，以确保该青春尚品在揽悦网的独家唯一性。
	6.3除开在揽悦网进行的交易，您不得向第三方授权或转让数字作品的部分或全部著作
	权，不得转让青春尚品的所有权、使用权或处分权，也不得以营利为目的使用、处分或授权第三方使用、处分数字作品。
	6.4您保证对作品进行真实、全面、详尽的披露和说明，不存在任何虚构或隐瞒。
	6.5您确认除上传至揽悦网并获得唯一青春尚品ID的数字作品外，不存在该数字作品部分或全部内容的其他青春尚品。
	6.6您承诺遵守法律法规的规定以及揽悦不时修订的条件、条款及其他政策。若您在揽悦上发布的信息构成违法违约的，揽悦可根据相应规则立即对相应信息进行删除、屏蔽处理。
	七、	违约责任
	7.1双方中若有任何一方违反本协议任何条款,并导致对方的权益受损时，应赔偿对方相应的经济损失。本合同所述损失包括实际损失和合同履行后可以获得的利益和相关的诉讼或仲裁费、律师费、合理的差旅费、调查费、鉴定费、 公证费等相关法律费用。
	7.2您在揽悦网上实施的行为，或虽未在揽悦网上实施但对揽悦及其用户产生影响的行为构成违约的，揽悦可依据相应规则中止向您提供部分或全部服务、划扣违约金等处理措施。如您的行为构成根本违约的，揽悦可采取查封您的账户，终止向您提供服务。
	7.3如您违反本协议第六条之约定，您应独立解决因此导致的任何法律纠纷井承担全部责任；
	如您的行为使揽悦及/或其关联公司遭受损失 （包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失）,您应赔偿揽悦及/或其关联公司上述全部损失。如您的行为使揽悦及/或其关联公司遭受第三人主张权利，揽悦及/或其关联公司可在对第三人承担金钱给付等义务后就全部损失向您追偿。如因您的行为使得第三人遭受损失或您怠于履行调处决定、揽悦及/或其关联公司出于社会公共利益保护目的，可指示合作支付公司自您的账户中划扣相应款项进行支付，直接从应支付您的结算费用中扣除。您同意揽悦指示合作支付公司自您的账户中划扣相应款项支付上述赔偿款项。如您的账户中的款项不足以支付上述赔偿款项的，揽悦及/或关联公司可直接抵减您在揽悦及/或关联公司其他协议项下的权益，并可继续追偿。
	八、	保密条款
	8.1任何一方对于因签署或履行本协议而了解或接触到的对方的机密资料和信息（下称“保密信息”，包括本协议的条款）均应保守秘密。非经对方书面同意，任何一方不得向第三方泄露、给予或转让该等保密信息。
	8.2如对方提岀要求，任何一方均应将载有对方保密信息的任何文件、资料或软件，按对方要求归还对方，或予以销毁，或进行其他处置，并且不得继续使用这些保密信息。
	8.3在本协议终止之后，各方在本条款项下的义务并不随之终止。各方仍需遵守本协议的保密条款，履行其所承诺的保密义务，直到其他方同意其解除此项义务。
	九、	不可抗力
	9.1“不可抗力”是指在本协议期限内发生的不可预见（或者虽可预见，但其发生或后果不可避 免）、非任何一方所能控制且使任何一方无法完全履行本协议的地震、台风、火灾、水灾、战争、罢工、暴动、黑客攻击、电信部门技术管制或任何其它自然或人为造成的灾难或意外事件。
	9.2本协议任何一方遭受不可抗力事件的影响造成本协议项下的义务不能履行，根据不可抗力事件影响的程度，可以部分或者全部免除责任，但因遭受不可抗力事件不能履行义务的一方须自不可抗力事件发生之日起48小时内以书面形式通知另一方，并且在不可抗力事件结束后5个工作日内向另一方以书面形式提供合理、真实的证明文件，并履行必要、合理的义务减少损失或负面影响。
	9.3如不可抗力事件及其影响在发生后一个月后仍未终止或消除，则甲乙双方可协商终止本协议且互不承担违约责任。
	十、通知和送达
	10.1有效联系方式
	您在注册成为揽悦网用户，并接受揽悦服务时，您应该向揽悦提供真实有效的联系方式（包括您的电子邮件地址、联系电话、联系地址、账户信息等），对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。
	您在注册揽悦网用户时生成的用于登陆揽悦网接收站内信、系统消息和即时信息账号（包括子账号），也作为您的有效联系方式。
	揽悦将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响， 请您务必及时关注。
	10.2通知的送达
	揽悦网通过上述联系方式向您发出通知，其中以电子的方式发出的书面通知，包括但不限于在揽悦网公告，向您提供的联系电话发送手机短信，向您提供的电子邮件地址发送电子邮件、向您的账号发送旺旺信息、系统消息以及站内信信息，在发送成功后朗视为误认，以纸质载体发出的书面通知，按照提供联系地址交邮后的第五个自然日即视为送达。
	对于在揽悦网上因交易活动引起的任何纠纷，您同意司法机关（包括但不限于人民法院）可以通过手机短信、电子邮件等现代通讯方式或邮寄方式向您送达法律文书（包括但不限于诉讼文书）。您指定接收法律文书的手机号码、电子邮箱等联系方式为您在揽悦注册、更新时提供的手机号码、电子邮箱联系方式以及在注册揽悦用户时生成账号，司法机关向上述联系方式发出法律文书即视为送达。您指定的邮寄地址为您的法定联系地址或您提供的有效联系地址。
	您同意司法机关可采取以上一种或多种送达方式向您达法律文书，司法机关采取多种方式向您送达法律文书，送达时间以上述送达方式中最先送达的为准。
	您同意上述送达方式适用于各个司法程序阶段。如进入诉讼程序的，包括但不限于一审、二审、再审、执行以及督促程序等。
	您应当保证所提供的联系方式是准确、有效的，并进行实时更新。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使法律文书无法送达或未及时送达，由您自行承担由此可能产生的法律后果。
	十一、禁止商业贿赂
	11.1任何一方保证不向另一方及与本合同有关的任何第三方的雇员或管理工作人员、直接或间接，在账外暗中支付任何佣金、报酬或给予回扣。
	11.2合同任何一方发现有人员违反上述规定，应第一时间向对方进行举报，井协助调査，对方须对该举报高度保密。
	11.3揽悦网举报电话：023-67020601
	十二、协议的终止
	12.1终止的情形
	【用户发起的终止】您有权通过以下任一方式终止本协议：
	（一）在满足揽悦网公示的账户注销条件时您通过网络自助服务注销您的账户的；
	（二）变更事项生效前您停止使用并明示不愿接受变更事项的；
	（三）您明示不愿继续使用揽悦服务，且符合揽悦网终止条件的。
	【揽悦发起的终止】出现以下情况时，揽悦可以本协议第十条的所列的方式通知您终止本协议：
	（一）您违反本协议约定，揽悦依据违约条款终止本协议的；
	（二）您盗用他人账户、发布违禁信息、骗取他人财物、售假、扰乱市场秩序采取不正当手段谋利等行为，揽悦依据规则对您的账户予以査封的；
	（三）除上述情形外，因您多次违反揽悦规则相关规定且情节严重，揽悦依据规则对您的账户予以査封的；
	（四）您的账户被揽悦依据本协议回收的；
	（五）您存在欺诈、发布或销售假冒伪劣/侵权商品、侵犯他人合法权益或其他严重违法违约行为的；
	（六）揽悦因政策或运营等原因停止提供服务的；
	（七）其他应当终止服务的情况。
	12.2协议终止后的处理
	【用户权利】本协议终止后，您仍享有下列权利：
	（一）若仍有数字作品衍生品制作的，合作分成继续享有。
	【揽悦权利】本协议终止后，揽悦仍享有下列权利：
	（一）继续保存您留存于揽悦的各类信息；
	（二）对于您过往的违约行为，揽悦仍可依据本协议向您追究违约责任。
	     【交易处理】本协议终止后.对于您在本协议存续期间产生的交易订单.揽悦可通知交易相对方并根据交易相对方的意愿决定是否关闭该等交易订单；如交易相对方要求继续履行的，则您应当就该等交易订单继续履行本协议及交易订单的约定,井承担因此产生的任何损失或増加的任何费用。
	十三、法律适用、管辖与其他
	13.1本协议及其附件、补充协议的签订、生效、解释、变更、履行、管辖及争议的解决等均适用中华人民共和国法律并依其解释。
	13.2凡因执行本协议或本协议的补充协议所发生的一切争议，双方应首先通过友好协商加以解决；协商不成或不能协商的，双方同意到揽悦经营者所在地有管辖权人民法院诉讼解决。违约方承担责任的范围包括但不限于直接损失、可预期收益、赔偿金、行政罚金、违约金、诉讼费、仲裁费、推广费、保全费、保全担保费用、律师费等。
	13.3本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
	13.4 揽悦经营者会不定期更新、调整本协议内容，并在揽悦上公示，协议内容以公示的最终版为准。
	
	本协议生效日期：2022年8月23日
				</view>
			</scroll-view>
		</u-modal>
	</view>
</template>

<script>
	import storeApi from "@/common/apis/store.js"
	import {calScrollHeight} from "@/common/common.js"
	export default{
		data(){
			return{
				applyStatus:'',
				applyForm:{
					idcardFrontImg:'default',
					idcardBackImg:'default',
					periodValidityType:'1'
				},
				frontList:[],
				backList:[],
				img0Uploading:false,
				img1Uploading:false,
				idTypeList:[{
					label:"长期有效",value:'1'
				},{
					label:"有效期",value:'0'
				}],
				typeSelectShow:false,
				typeName:'',
				params:{
					year: true,
					month: true,
					day: true,
				},
				validShow0:false,
				validShow1:false,
				validStart:'',
				validEnd:'',
				scrollViewHeight:0,
				agreeProtocol:false,
				protocolShow: false,
				protocolTitle: '创作者合作协议',
				protocolContent: '',
				titleStyle: {
					marginBottom: '30rpx'
				},
			}
		},
		onLoad(option){
			this.applyStatus = Number(option.applyStatus)
			this.scrollViewHeight = calScrollHeight(350)
			this.applyForm.idcardNo=option.idcardNo;
			this.applyForm.idcardName=option.idcardName;
		},
		methods:{
			showProtocol(key) {
				this.protocolTitle = '创作者合作协议'
				this.protocolContent = 
				this.protocolShow = true
			},
			validateId(){
				if(!this.$u.test.idCard(this.applyForm.idcardNo)){
					this.$u.toast('请正确输入身份证')
					return false
				}
				return true
			},
			showType(){
				this.typeSelectShow=true
			},
			typeConfirm(item,index){
				this.applyForm.periodValidityType = item[0].value
				this.typeName = item[0].label
			},
			startConfirm(item){
				this.validStart = item.year+'-'+item.month+'-'+item.day
				this.applyForm.periodValidityStart = this.validStart+' 23:59:59'
			},
			endConfirm(item){
				this.validEnd = item.year+'-'+item.month+'-'+item.day
				this.applyForm.periodValidityEnd = this.validEnd+' 00:00:00'
			},
			img0UploadStart(){
				this.img0Uploading = true
			},
			img1UploadStart(){
				this.img1Uploading = true
			},
			frontChosen(data,index){
				this.applyForm.idcardFrontImg = data
				this.img0Uploading = false
			},
			frontRemove(index, list, name){
				this.applyForm.idcardFrontImg = undefined
			},
			backChosen(data,index){
				this.applyForm.idcardBackImg = data
				this.img1Uploading = false
			},
			backRemove(index, list, name){
				this.applyForm.idcardBackImg = undefined
			},
			doCancel(){
				storeApi.myStoreAuditCancel().then(res=>{
					this.$u.toast('撤销成功')
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/sys/mine/index'
						})
					},500)
				}).then(err=>{
					this.$u.toast(err)
				})
			},
			doApply(){
				if(this.$u.test.isEmpty(this.applyForm.idcardName)){
					return this.$u.toast('请输入姓名')
				}
				let flag = this.validateId()
				if(!flag)return
				// if(this.$u.test.isEmpty(this.applyForm.idcardFrontImg)||this.$u.test.isEmpty(this.applyForm.idcardBackImg)){
				// 	return this.$u.toast('请上传身份证照片')
				// }
				// if(this.$u.test.isEmpty(this.applyForm.periodValidityType)){
				// 	return this.$u.toast('请选择身份证有效期类型')
				// }
				// if(this.applyForm.periodValidityType==='0'){
				// 	if(!this.applyForm.periodValidityStart||!this.applyForm.periodValidityEnd){
				// 		return this.$u.toast('请选择身份证有效期')
				// 	}
				// 	if(new Date(this.applyForm.periodValidityStart)>=new Date(this.applyForm.periodValidityEnd)){
				// 		return this.$u.toast('有效期起不可大于等于有效期止')
				// 	}
				// }
				// if(this.img0Uploading||this.img1Uploading){
				//   return this.$u.toast('图片正在上传中，请稍等再提交')
				// }
				if(!this.agreeProtocol){
					return this.$u.toast('请先同意协议')
				}
				storeApi.myStoreApply({
					params:this.applyForm
				}).then(res=>{
					this.$u.toast('申请开通店铺成功')
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/sys/mine/index'
						})
					},500)
				}).catch(err=>{
					this.$u.toast(err)
				})
			},
			customGoBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #18181c;
	}
</style>
<style lang="scss" scoped>
	@import "@/common/css/index.scss";

	.applyStore{
		/deep/ .u-select__body__picker-view__item{
			color: black !important;
		}
		/deep/ .u-column-item{
			color: black !important;
		}
	}

	.publishUpload{
		 /deep/ .u-list-item.u-add-wrap{
			background-color: #2A2A34 !important;
			border-radius: 30rpx;
			color:#999999 !important;
			border:1rpx solid #999999;
		}
	}
</style>
