import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MemberListComponent from "./Components/BBS/MemberData/MemberList";
import AdminHeaderComponent from "./Components/Common/Admin-Header";
import BBSHomePage from "./Components/BBS/BBSHomePage";
import Login from "./Components/Login/Login";
import DataGridComponent from "./Components/DataGrid/DataGrid";
import LogoutComponent from "./Components/Login/Logout";
import GrantRequestEdit from "./Components/GrantRequest/GrandRequestEdit";
import GrantRequestView from "./Components/GrantRequest/GrantRequestView";
import GrantHistoryComponent from "./Components/GrantRequest/GrantHistory";
import MemberRegPreview from "./Components/BBS/MemberData/MemberRegPreview";
import SearchModifyDelete from "./Components/BBS/Member monitor management/SearchModifyDelete";
import SearchModifyDeleteDetail from "./Components/BBS/Member monitor management/SearchModifyDeleteDetail";
import MemberThanks from "./Components/BBS/MemberData/MemberThanks";
import MailMagazineMemberList from "./Components/BBS/Mail Magazine Management/MailMagazineMemberList";
import GrantRequestListView from './Components/GrantRequest/GrantRequestListView';
import GrantRequestPreview from './Components/GrantRequest/GrantRequestPreview';
import HomePage from './Components/Home/HomePage';
import GrantRequestEditView from './Components/GrantRequest/GrantRequestEditView';
import MemberReg from './Components/BBS/MemberData/MemberReg';
import Histroy_withdrawal from './Components/BBS/MembershipManage/HistoryWithdrwl';
import MemberdataDwnld from './Components/BBS/MemberData/DwnldmemberData';

import MailMagazineMemberListGen from "./Components/BBS/Mail Magazine Management/Mail Magazine member list(gen)/MailMagazineMemberListGen";
import UploadMailMagazine from "./Components/BBS/Upload mail magazine/UploadMailMagazine";
import UploadExcel from "./Components/BBS/Upload mail magazine/UploadExcel";
import UploadCSV from "./Components/BBS/Upload mail magazine/UploadCSV";

import UnderReview from "./Components/BBS/MembershipManage/UnderReview";
import MemberSearchComponent from "./Components/BBS/MemberData/MemberSearch";
import MemberEdit from "./Components/BBS/MemberData/MemberEdit";
import MemberEditPreview from "./Components/BBS/MemberData/MemberEditPreview";
import Remarksawait_review from './Components/BBS/Member monitor management/RemarksawaitReview';
import Remarkspending_review from './Components/BBS/Member monitor management/Remarkspending';
import UserWithdrawn from "./Components/BBS/MembershipManage/Userwithdrawn";
import SearchDeleteMailmembersbbs from "./Components/BBS/Mail Magazine Management/SearchdeleteMembersbbs";
import SearchDeleteMailmembersgeneral from "./Components/BBS/Mail Magazine Management/SearchdeletemailMembersgeneral";
import NGword from "./Components/BBS/Member monitor management/NgWord";
import AutomaticApproval from "./Components/BBS/Member monitor management/Automaticapproval";
import NgMember from "./Components/BBS/Member monitor management/NgMember";
import DownloadRemark from "./Components/BBS/Member monitor management/DownloadRemarks";
import UserPendingReview from "./Components/BBS/MembershipManage/UserPendingReview";
import UpdateresponseHeader from "./Components/BBS/MembershipManage/UpdateresponsePage";
import MoritoNervous from "./Components/Check Sheet Mail/Morita nervousness/MoritoNervous";
import MoritaEmailReplay from "./Components/Check Sheet Mail/Morita nervousness/MoritaEmailReplay";
import Social_phobia from "./Components/Check Sheet Mail/Social phobia/Social_phobia";
import EmailReception from "./Components/Check Sheet Mail/Email reception/EmailReception";
import PastHistory from "./Components/Check Sheet Mail/Past History/PastHistory";
import DailyEmail from "./Components/Check Sheet Mail/Daily Report on numberEmail/DailyEmail";
import Reservation_list_slot from "./Components/Reservation Counseling/Reservation_list_slot";
import EditMailMemberGeneral from "./Components/BBS/Mail Magazine Management/EditMailMemberGeneral";
import MemberSearchList from "./Components/BBS/MemberData/MemberSearchList";
import ListMailMagazineBBS from "./Components/BBS/Mail Magazine Management/ListMailMagazineBBS/ListMailMagazineBBS";
import SendEmailToMemberBBS from "./Components/BBS/Mail Magazine Management/ListMailMagazineBBS/SendEmailToMember(BBS)";
import Reservation_confirmation from "./Components/Reservation Counseling/Reservation Confirmation/Reservation_confirmation";
import Reservation_cancel from "./Components/Reservation Counseling/Reservation Cancel/Reservation_cancel";
import Registration_counselors from "./Components/Reservation Counseling/Registration Counselors/Registration_counselors";


import ListMailMagazine_Theme from "./Components/BBS/Mail Magazine Management/List mailmagazine by Theme/ListMailMagazine_Theme";
import EmailReply_Theme from "./Components/BBS/Mail Magazine Management/List mailmagazine by Theme/EmailReply_Theme";
import ListMailMagPreview from "./Components/BBS/Mail Magazine Management/List mailmagazine by Theme/ListMailMagPreview";
import BBSmail_correction from "./Components/BBS/Mail Magazine Management/ListMailMagazineBBS/EmailcorrectionBBS";
import EmailEdit_BBS from "./Components/BBS/Mail Magazine Management/ListMailMagazineBBS/Email_editPreviewBBS";
import SendMailView_BBS from "./Components/BBS/Mail Magazine Management/ListMailMagazineBBS/SendviewBBS";
import ListMailMagazineGeneral from "./Components/BBS/Mail Magazine Management/ListMailMagazineGeneral/ListMailMagazineGeneral";
import GeneralMailCorrection from "./Components/BBS/Mail Magazine Management/ListMailMagazineGeneral/GeneralMailCorrection";
import GeneralMailCorrectionPreview from "./Components/BBS/Mail Magazine Management/ListMailMagazineGeneral/GeneralMailCorrectionPreview";
import SendEmailToMemberGeneral from "./Components/BBS/Mail Magazine Management/ListMailMagazineGeneral/SendEmailToMemberGenral";
import SendMailView from "./Components/BBS/Mail Magazine Management/ListMailMagazineGeneral/SendMailView";
import SendMailMagazineBBS from "./Components/BBS/Mail Magazine Management/SendMailMagazineBBS/SendMailMagazineBBS";
import SendMailBBSPreview from "./Components/BBS/Mail Magazine Management/SendMailMagazineBBS/SendMailBBSPreview";
import EmailMAILmag_Theme from "./Components/BBS/Mail Magazine Management/SendMailMagazineTheme/SendMailMagtheme";
import SendmailmagPreviewtheme from "./Components/BBS/Mail Magazine Management/SendMailMagazineTheme/SendMailMagPreview";
import AdminSettings from "./Components/BBS/Mail Magazine Management/Adminsettings";
import SendMailMagazineGeneral from "./Components/BBS/Mail Magazine Management/SendMailMagazineGeneral/SendMailMagazineGeneral";
import SendMailGeneralPreview from "./Components/BBS/Mail Magazine Management/SendMailMagazineGeneral/SendMailMagazineGeneralPreview";
import Monthly_report_mail_count from "./Components/Check Sheet Mail/Monthly Report Mail/Monthly_report_mail_count";
import New_lender_Reg from "./Components/Library/New Lender Registration/New_lender_Reg";
import ResponseTemplate from "./Components/Check Sheet Mail/ResponseTemplate/ResponseTemplate";
import NewTemplateCreate from "./Components/Check Sheet Mail/ResponseTemplate/NewTemplateCreate";
import TemplateConfirmation from "./Components/Check Sheet Mail/ResponseTemplate/TemplateConfirmation";
import EditTemplate from "./Components/Check Sheet Mail/ResponseTemplate/EditTemplate";
import New_lender_preview from "./Components/Library/New Lender Registration/New_lender_preview";
import Reservationreg_cancel from "./Components/Reservation Counseling/Reservationreg_cancel";
import ReservationListDownload from "./Components/Reservation Counseling/ReservationListDownload";

import Depression from "./Components/Check Sheet Mail/Depression/Depression";
import CompulsiveDisorder from "./Components/Check Sheet Mail/Compulsive Disorder/CompulsiveDisorder";
import Reservation_List from "./Components/Check Sheet Mail/Email Reservation List/EmailReservationList";
import ReserveListmailReplay from "./Components/Check Sheet Mail/Email Reservation List/ReservListsendEmail";
import ReserveListmailPreview from "./Components/Check Sheet Mail/Email Reservation List/ReservationPreview";
import Detailed_List from "./Components/Check Sheet Mail/Email Reservation List/EditdetailedListpage";
import CheckSheetSendMailEdit from "./Components/Check Sheet Mail/Email Reservation List/SendEmailedit";
import MoritaEmailPreview from "./Components/Check Sheet Mail/Morita nervousness/EmailPreview";
import CheckSheetSendMail from "./Components/Check Sheet Mail/Morita nervousness/SendMail";
import TemplatePreview_2 from "./Components/Check Sheet Mail/ResponseTemplate/TemplatePreview_2";
import Download_library from "./Components/Library/Management of Library/Download Library data/Download_library";
import Download_loan from "./Components/Library/Management of Library/Download Loan data/Download_loan";
import AdminFinish from "./Components/BBS/Mail Magazine Management/AdminFinish";
import DailyCheckSheetReport from "./Components/Check Sheet Mail/DailyReportCheckSheet/DailyCheckSheetReport";
import MonthlyReportCheckSheet from "./Components/Check Sheet Mail/MonthlyReportCheckSheet/MonthlyReportCheckSheet";
// import Registration_Lending_return from "./Components/Library/Registration Lending return/Registration_Lending_return";
// import RecommendBookManage from "./Components/Library/WebpostingManagement/ReccomendedBooks";
// import BookPublish_Web from "./Components/Library/WebpostingManagement/BookPublished";
//import Registration_Lending_return from "./Components/Library/Registration Lending return/Registration_Lending_return";
import RecommendBookManage from "./Components/Library/WebpostingManagement/ReccomendedBooks";
import BookPublish_Web from "./Components/Library/WebpostingManagement/BookPublished";
import DeletedEmails from "./Components/Check Sheet Mail/Trashcan/Deleted_Emails";
import LibraryHomePage from "./Components/Library/LibraryHomePage";
import SearchModifyViewBook from "./Components/Library/SearchModifyDeleteManagement/SearchModifyViewBooks";
import SearchList from "./Components/Library/SearchModifyDeleteManagement/SearchList";
import BookList from "./Components/Library/SearchModifyDeleteManagement/BookList";
import Edit_Loancontent from "./Components/Library/LendingReturn management/EditLoancontents";
import LenderList from "./Components/Library/LendingReturn management/LenderList";
import Edit_lenderProfile from "./Components/Library/LendingReturn management/EditLenderProfile";
import Search_registrant from "./Components/Library/Editing Existing Registrant/Search_registrant";
import Registratnt_edit from "./Components/Library/Editing Existing Registrant/Registratnt_edit";
// import Reservationreg_cancel from "./Components/Reservation Counseling/Reservationreg_cancel";
import G1UploadPDF from "./Components/Library/Upload PDF/PDF upload/G1UploadPDF";
import G2UploadPDFSeparate from "./Components/Library/Upload PDF/PDF upload separate/G2UploadPDFseparate";
// import ManagementWebPosting from "./Components/Library/WebpostingManagement/Management of books published on the web/ManagementWebPosting";
import AddC1Abook from "./Components/Library/Additional Management of books/AdditionOfC1Abook";
import AddDel from "./Components/Library/Additional Management of books/AdditionOrDeletionOfBooks";
import NewbooksMoritaOther from "./Components/Library/WebpostingManagement/Manage New books/NewbooksMoritaOthers";
import BookSearchUpload from "./Components/Library/Upload PDF/PDF upload/uploadPDF";
import BookSearchUploadList from "./Components/Library/Upload PDF/PDF upload/uploadPDFlist";
import BookSearchUploadSeparate from "./Components/Library/Upload PDF/PDF upload separate/uploadPDFseparate";
import BookSearchUploadSeparateList from "./Components/Library/Upload PDF/PDF upload separate/uploadPDFseparateList";
import EditingExistingRegisterList from "./Components/Library/LendingReturn management/EditingExistingRegisterList";
import Panic_Disorder from "./Components/Check Sheet Mail/Panic Disorder/Panic_Disorder";
import Registrant_list from "./Components/Library/Editing Existing Registrant/Registrant_list";
import Editing_loan_modifying from "./Components/Library/List of loaned books/Editing_loan_modifying";
import Loan_list_book from "./Components/Library/List of loaned books/Loan_list_book";
import Csv_upload from "./Components/Library/CSV upload/Csv_upload";
import Excel_upload from "./Components/Library/Excel upload/Excel_upload";
import ManagementWebPosting from "./Components/Library/WebpostingManagement/PublishedBooklist";
import BookView from "./Components/Library/SearchModifyDeleteManagement/BookView";
import SearchBookLender from "./Components/Library/BookLending/SearchBookLender";
import LenderSearchList from "./Components/Library/BookLending/LenderSearchList";
import RentalBookSearch from "./Components/Library/BookLending/RentalBookSearch";
import G2Edit from "./Components/Library/Upload PDF/PDF upload/G2Edit";
import G2EditSeparate from "./Components/Library/Upload PDF/PDF upload separate/G2EditSeparate";
import DailyAgeReport from "./Components/Tel Counselling Daily Report/dailyAgeReport";
import DailyGenderReport from "./Components/Tel Counselling Daily Report/dailyGenderReport";
import MonthlyGenderReport from "./Components/TelCounselling Monthly Report/MonthlyGenderReport";
import MonthlyAgeReport from "./Components/TelCounselling Monthly Report/MonthlyAgeReport";
import TelcounsellingSearch from "./Components/Check Sheet Mail/Tel Counselling Search/TelcounsellingSearch";
import TelephoneConsultation from "./Components/Check Sheet Mail/telephoneconsultation/Telephone_Consultation";
import TelephoneConsultationEdit from "./Components/Check Sheet Mail/telephoneconsultation/TelephoneConsultationEdit";
import TelephoneConsultationView from "./Components/Check Sheet Mail/telephoneconsultation/TelephoneConsultationView";
import DiagramList from "./Components/Check Sheet Mail/telcounsellingdiagramlist/DiagramList";
import DailyIllnessReport from "./Components/Tel Counselling Daily Report/DailyIllnessReport";
import MonthlyIllnessReport from "./Components/TelCounselling Monthly Report/MonthlyIllnessReport";
import DeleteresponseHeader from "./Components/Check Sheet Mail/telephoneconsultation/DeleteResponse";
import SavedresponseHeader from "./Components/Check Sheet Mail/telephoneconsultation/SavedResponse";
import DailyCounsellingReport from "./Components/Tel Counselling Daily Report/DailyCounsellingReport";
import MonthlyCounsellingReport from "./Components/TelCounselling Monthly Report/MonthlyCounsellingReport";

const HeaderRoutes: React.FC = () => {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname=="/logout"||
    
    location.pathname == "/home";

  return (
    <>
      {!isLoginPage && <AdminHeaderComponent />}
      <Routes>
        <Route path="/header" element={<AdminHeaderComponent />} />
        {/* <Route path="/memberlist" element={<DataGridComponent />} /> */}
        <Route path="/list" element={<MemberListComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="/home" element={<HomePage />} />
        {/* =============================BBS Routes============================ */}
        <Route path="/bbshome" element={<BBSHomePage />} />
        <Route path="/bbshistory" element={<Histroy_withdrawal />} />
        <Route path="/memberjoin" element={<MemberReg />} />
        <Route path="/memberpreview" element={<MemberRegPreview />} />
        <Route path="/membermonitor" element={<SearchModifyDelete />} />
        <Route path="/membermonitordetail" element={<SearchModifyDeleteDetail />} />
        <Route path="/memberaddfinish" element={<MemberThanks />} />
        <Route path="/mailmagazinememberlist-bbs" element={<MailMagazineMemberList />} />
        <Route path="/mailmagazinememberlist-gen" element={<MailMagazineMemberListGen />} />
        <Route path="/mail_magazine" element={<UploadMailMagazine />} />
        <Route path="/mail_magazine_uploadexcel/:specificValue" element={<UploadExcel />} />
        <Route path="/mail_magazine_uploadcsv/:specificValue" element={<UploadCSV />} />
        <Route path="/memberdownload" element={<MemberdataDwnld />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/grantedit" element={<GrantRequestEdit />} /> */}
        <Route path="/grantedit" element={<GrantRequestEditView />} />
        <Route path="/grantview" element={<GrantRequestView />} />
        <Route path="/grantpreview" element={<GrantRequestPreview />} />
        <Route path="/granthistory" element={<GrantHistoryComponent />} />
        <Route path="/grantlistview" element={<GrantRequestListView />} />
        <Route path="/remarksawait" element={<Remarksawait_review />} />
        <Route path="/remarkpending" element={<Remarkspending_review />} />
        <Route path="/underreview" element={<UnderReview />} />
        <Route path="/membersearch" element={<MemberSearchComponent />} />
        <Route path="/membersearchlist" element={<MemberSearchList/>}/>
        <Route path="/memberlist" element={< MemberListComponent />} />
        <Route path="/memberedit" element={< MemberEdit />} />
        <Route path="/membereditpreview" element={< MemberEditPreview />} />
        <Route path="/listmailmagazinebbs" element={<ListMailMagazineBBS />} /> 
        <Route path="/sendmailtobbs" element={<SendEmailToMemberBBS />} /> 
        <Route path="/userwithdrawn" element={<UserWithdrawn />} />
        <Route path="/searchmailmemberbbs" element={<SearchDeleteMailmembersbbs />} />
        <Route path="/searchmailmembergeneral" element={<SearchDeleteMailmembersgeneral />} />
        <Route path="/ngword" element={<NGword />} />
        <Route path="/ngmember" element={<NgMember />} />
        <Route path="/automaticapproval" element={<AutomaticApproval />} />
        <Route path="/downloadremark" element={<DownloadRemark />} />
        <Route path="/pendingreview" element={<UserPendingReview />} />
        <Route path="/updateresponsepage" element={<UpdateresponseHeader />} />
        <Route path="/editmailmembergeneral" element={<EditMailMemberGeneral />} />
        <Route path="/mailmagazinetheme" element={<ListMailMagazine_Theme/>}/>
        <Route path="/emailreplytheme" element={<EmailReply_Theme/>}/>
        <Route path="emailreplypreview" element={<ListMailMagPreview/>}/>
        <Route path="/emailbbsedit" element={<BBSmail_correction />} />
        <Route path="/emailbbspreview" element={<EmailEdit_BBS />} />
        <Route path="/emailbbsview" element={<SendMailView_BBS />} />
        <Route path="/listmailmagazinegeneral" element={<ListMailMagazineGeneral />} /> 
        <Route path="/mailcorrectiongeneral" element={<GeneralMailCorrection />} />
        <Route path="/mailcorrectiongeneralPrev" element={<GeneralMailCorrectionPreview />} />
        <Route path="/sendmailtogeneral" element={<SendEmailToMemberGeneral />} /> 
        <Route path="/sendmailview" element={<SendMailView/>} /> 
        <Route path="/sendmailmagbbs" element={<SendMailMagazineBBS/>} /> 
        <Route path="/sendmailmagbbspreview" element={<SendMailBBSPreview/>} />
        <Route path="/sendmailmagtheme" element={<EmailMAILmag_Theme/>} />
        <Route path="/sendmailmagpreview" element={<SendmailmagPreviewtheme/>} />
        <Route path="/adminsettings" element={<AdminSettings/>} />
        <Route path="/adminfinish" element={<AdminFinish/>}/>
        <Route path="/sendmailmaggeneral" element={<SendMailMagazineGeneral/>} /> 
        <Route path="/sendmailmaggeneralpreview" element={<SendMailGeneralPreview/>} />

        {/*  <Route component={NotFound} /> */}

        {/*================================ Check Sheet Mail Routes============================================= */}
        <Route path="/checksheet1" element={<MoritoNervous/>}/>
        <Route path="/checksheet-create" element={<MoritaEmailReplay/>}/>
        <Route path="/checksheet2" element={<Social_phobia/>}/>
        <Route path="/checksheet3" element={<Panic_Disorder/>}/>
        <Route path="/checksheet4" element={<Depression/>}/>
        <Route path="/checksheet5" element={<CompulsiveDisorder/>}/>
        <Route path="/mailsend_and_reservation_oneyearlist" element={<EmailReception/>}/>
        <Route path="/pasthistory" element={<PastHistory/>}/>
        <Route path="/dailymailcount" element={<DailyEmail/>}/>
        <Route path="/monthlymailcount" element={<Monthly_report_mail_count/>}/>
        <Route path="/dailycountchecksheet" element={<DailyCheckSheetReport/>}/>
        <Route path="/monthlycountchecksheet" element={<MonthlyReportCheckSheet/>}/>
        <Route path ="/responsetemplate" element={<ResponseTemplate/>}/>
        <Route path ="/newtemplate" element={<NewTemplateCreate/>}/>
        <Route path ="/confirmtemplate" element={<TemplateConfirmation/>}/>
        <Route path ="/edittemplate" element={<EditTemplate/>}/>
        <Route path='/editpreview' element={<TemplatePreview_2/>}/>
        <Route path ="/diagnosismailing_list" element={<Reservation_List/>}/>
        <Route path="/Reservemailreply" element={<ReserveListmailReplay/>}/>
        <Route path="/Reservemailpreview" element={<ReserveListmailPreview/>}/>
        <Route path="/reservationdetaillist" element={<Detailed_List/>}/>
        <Route path="/checksheetEmailedit" element={<CheckSheetSendMailEdit/>}/>
        <Route path ="/emailpreview" element={<MoritaEmailPreview/>}/>
        <Route path ="/checksheetsendmail" element={<CheckSheetSendMail/>}/>
        <Route path="/checksheetdeletedemail" element={<DeletedEmails/>}/>
        <Route path="/dailyagereport" element={<DailyAgeReport/>}/>
        <Route path="/dailygenderreport" element={<DailyGenderReport/>}/>
        <Route path="/telcounsellingdiagramlist" element={<DiagramList/>}/>
        <Route path="/telcounsellingsearch" element={<TelcounsellingSearch/>}/>
        <Route path="/telephoneconsultationview" element ={<TelephoneConsultationView/>}/>
        <Route path="/telephoneconsultationedit" element={<TelephoneConsultationEdit/>}/>
        <Route path="/telephoneconsultation" element={<TelephoneConsultation/>}/>
        <Route path="/deleteresponse" element={<DeleteresponseHeader/>}/>
        <Route path="/savedresponse" element={<SavedresponseHeader/>}/>
        

        
        {/* =============================== Reservation Counseling ======================================*/} 
        <Route path="/reservationslotlist" element={<Reservation_list_slot/>}/>
        <Route path="/reservation_list_confirm_reservation" element={<Reservation_confirmation/>}/>
        <Route path="/todays_cancellations" element={<Reservation_cancel/>}/>
        <Route path="/addcounselors" element={<Registration_counselors/>}/>
        <Route path="/reservationreg_cancel" element={<Reservationreg_cancel/>}/>
        <Route path="/reservationlist" element={<ReservationListDownload/>}/>


      {/* ================================= Library================================================================ */}
      <Route path="/newlenderregister" element={<New_lender_Reg/>} />
      <Route path="/newlenderpreview" element={<New_lender_preview/>}/>
      <Route path="/lenderlist" element={<LenderList/>} />
      <Route path='/editlendersearch' element={<Search_registrant/>}/>
      <Route path='/editlenderlist' element={<Registrant_list/>}/>
      <Route path='/registrantedit' element={<Registratnt_edit/>}/>
      <Route path='/loanlistbooks' element={<Loan_list_book/>}/>
      <Route path='/editloancontents' element={<Editing_loan_modifying/>}/>
      <Route path="/editlender" element={<Edit_lenderProfile/>} />
      <Route path="/allbooks" element={<Download_library/>}/>
      <Route path="/lendingbooks" element={<Download_loan/>}/>
      <Route path="/booklist" element={<BookList/>}/>
      <Route path="/booksearch" element={<SearchModifyViewBook/>}/>
      <Route path="/searchlist" element={<SearchList/>}/>
      <Route path="/libraryhomepage" element={<LibraryHomePage/>}/>
      <Route path="/loanlender" element={<Edit_Loancontent/>}/>
      {/* <Route path="/booklendingreturn" element={<Registration_Lending_return/>}/> */}
      <Route path="/recommendbooks" element={<RecommendBookManage/>}/>
       <Route path="/webbookpublish" element={<BookPublish_Web/>}/>
       <Route path="/publishedbooklist" element={<ManagementWebPosting/>}/>
       <Route path="/addC1Abook" element={<AddC1Abook/>}/>
        <Route path="/adddel" element={<AddDel/>}/>
        <Route path="/manageMoritaOthers" element={<NewbooksMoritaOther/>}/>
        <Route path="/G1upload" element={<G1UploadPDF/>}/>
        <Route path="uploadPDF" element={<BookSearchUpload/>}/>
        <Route path="/uploadPDFlist" element={<BookSearchUploadList/>}/>
        <Route path="/uploadPDFseparate" element={<BookSearchUploadSeparate/>}/>
        <Route path="/uploadPDFseparatelist" element={<BookSearchUploadSeparateList/>}/>
        <Route path="/G2uploadseparate" element={<G2UploadPDFSeparate/>}/>
        {/* <Route path="/Webposting" element={<ManagementWebPosting/>}/> */}
        <Route path="/EditingExstingRegisterList" element={<EditingExistingRegisterList/>}/>
        <Route path="/librarycsvupload" element={<Csv_upload/>}/>
        <Route path="/libraryexcelupload" element={<Excel_upload/>}/>
        <Route path="/bookview" element={<BookView/>}/>
        <Route path="/searchbooklender" element={<SearchBookLender/>}/>
        <Route path="/lendersearchlist" element={<LenderSearchList/>}/>
        <Route path="/rentalbooksearch" element={<RentalBookSearch/>}/>
        <Route path="/G2edit" element={<G2Edit/>}/>
        <Route path="/G2editseparate" element={<G2EditSeparate/>}/>
        <Route path="/monthly-gender-report" element={<MonthlyGenderReport/>}/>
        <Route path="/monthly-age-report" element={<MonthlyAgeReport/>}/>
        <Route path="/daily-illness-report" element={<DailyIllnessReport/>}/>
        <Route path="/monthly-illness-report" element={<MonthlyIllnessReport/>}/>
        <Route path="/daily-counselling-report" element={<DailyCounsellingReport/>}/>
        <Route path="/monthly-counselling-report" element={<MonthlyCounsellingReport/>}/>

      </Routes>
    </>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <HeaderRoutes />
    </Router>
  );
};

export default AppRouter;